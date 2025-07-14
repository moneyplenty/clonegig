import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createServiceRoleClient } from "@/lib/supabase/service-role"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
})

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  const supabase = createServiceRoleClient()
  const body = await req.text()
  const sig = req.headers.get("stripe-signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`)
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.CheckoutSession
      const userId = session.metadata?.user_id as string
      const totalAmount = session.amount_total ? session.amount_total / 100 : 0 // Convert cents to dollars
      const paymentStatus = session.payment_status

      if (paymentStatus === "paid" && userId) {
        // Create a new order in your database
        const { data: order, error: orderError } = await supabase
          .from("orders")
          .insert({
            user_id: userId,
            total_amount: totalAmount,
            status: "completed",
          })
          .select()
          .single()

        if (orderError) {
          console.error("Error inserting order:", orderError)
          return new NextResponse("Error inserting order", { status: 500 })
        }

        // Optionally, retrieve line items and save them to order_items table
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
          expand: ["data.price.product"],
        })

        for (const item of lineItems.data) {
          const product = item.price?.product as Stripe.Product
          const productId = product?.metadata?.supabase_product_id || null // Assuming you store Supabase product ID in Stripe product metadata
          const quantity = item.quantity || 1
          const unitPrice = item.price?.unit_amount ? item.price.unit_amount / 100 : 0

          if (order.id && productId) {
            const { error: orderItemError } = await supabase.from("order_items").insert({
              order_id: order.id,
              product_id: productId,
              quantity: quantity,
              price: unitPrice,
            })
            if (orderItemError) {
              console.error("Error inserting order item:", orderItemError)
            }
          }
        }
      }
      break
    case "customer.subscription.created":
    case "customer.subscription.updated":
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string

      // Retrieve the user_id from your stripe_customers table
      const { data: customerData, error: customerDataError } = await supabase
        .from("stripe_customers")
        .select("id")
        .eq("stripe_customer_id", customerId)
        .single()

      if (customerDataError || !customerData) {
        console.error("Error fetching user ID for customer:", customerDataError)
        return new NextResponse("User not found for customer", { status: 404 })
      }

      const userIdForSubscription = customerData.id

      const { error: upsertSubscriptionError } = await supabase.from("stripe_subscriptions").upsert(
        {
          user_id: userIdForSubscription,
          stripe_subscription_id: subscription.id,
          stripe_price_id: subscription.items.data[0].price.id,
          status: subscription.status,
          current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        },
        { onConflict: "stripe_subscription_id" },
      )

      if (upsertSubscriptionError) {
        console.error("Error upserting subscription:", upsertSubscriptionError)
        return new NextResponse("Error upserting subscription", { status: 500 })
      }

      // Update user's membership_tier based on subscription status/price
      // You'll need to map Stripe Price IDs to your membership tiers
      let newMembershipTier: string | null = null
      if (subscription.status === "active") {
        if (subscription.items.data[0].price.id === "price_123_fan_tier") {
          newMembershipTier = "fan"
        } else if (subscription.items.data[0].price.id === "price_456_superfan_tier") {
          newMembershipTier = "super_fan"
        }
      } else {
        newMembershipTier = "free" // Or a default tier for inactive subscriptions
      }

      if (newMembershipTier) {
        const { error: updateProfileError } = await supabase
          .from("profiles")
          .update({ membership_tier: newMembershipTier })
          .eq("id", userIdForSubscription)

        if (updateProfileError) {
          console.error("Error updating user profile membership tier:", updateProfileError)
          return new NextResponse("Error updating user profile", { status: 500 })
        }
      }
      break
    case "customer.subscription.deleted":
      const deletedSubscription = event.data.object as Stripe.Subscription
      const deletedCustomerId = deletedSubscription.customer as string

      const { data: deletedCustomerData, error: deletedCustomerDataError } = await supabase
        .from("stripe_customers")
        .select("id")
        .eq("stripe_customer_id", deletedCustomerId)
        .single()

      if (deletedCustomerDataError || !deletedCustomerData) {
        console.error("Error fetching user ID for deleted customer:", deletedCustomerDataError)
        return new NextResponse("User not found for deleted customer", { status: 404 })
      }

      const userIdForDeletedSubscription = deletedCustomerData.id

      // Mark subscription as canceled or delete it
      const { error: deleteSubscriptionError } = await supabase
        .from("stripe_subscriptions")
        .update({ status: "canceled" })
        .eq("stripe_subscription_id", deletedSubscription.id)

      if (deleteSubscriptionError) {
        console.error("Error updating deleted subscription status:", deleteSubscriptionError)
        return new NextResponse("Error updating deleted subscription", { status: 500 })
      }

      // Downgrade user's membership tier
      const { error: downgradeProfileError } = await supabase
        .from("profiles")
        .update({ membership_tier: "free" })
        .eq("id", userIdForDeletedSubscription)

      if (downgradeProfileError) {
        console.error("Error downgrading user profile membership tier:", downgradeProfileError)
        return new NextResponse("Error downgrading user profile", { status: 500 })
      }
      break
    default:
      console.warn(`Unhandled event type ${event.type}`)
  }

  return new NextResponse("OK", { status: 200 })
}
