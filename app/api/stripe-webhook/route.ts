import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
})

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")

  if (!signature) {
    return new NextResponse("No stripe-signature header found", { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`)
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 })
  }

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session

        if (session.mode === "subscription") {
          // Handle membership subscription
          console.log("Membership subscription completed:", session.id)
          // The user account creation is handled in the frontend after payment
        } else if (session.mode === "payment") {
          // Handle one-time payments (merchandise)
          const userId = session.metadata?.userId
          const cartItemsString = session.metadata?.cartItems

          if (userId && cartItemsString) {
            const cartItems = JSON.parse(cartItemsString)

            // Create order in database
            const { error } = await supabase.from("Order").insert({
              userId,
              stripeSessionId: session.id,
              totalAmount: (session.amount_total || 0) / 100,
              status: "completed",
            })

            if (error) {
              console.error("Error creating order:", error)
            } else {
              console.log("Order created successfully for session:", session.id)
            }
          }
        }
        break

      case "customer.subscription.updated":
        const subscription = event.data.object as Stripe.Subscription
        console.log("Subscription updated:", subscription.id)
        break

      case "customer.subscription.deleted":
        const deletedSubscription = event.data.object as Stripe.Subscription
        console.log("Subscription cancelled:", deletedSubscription.id)

        // Update user role to guest when subscription is cancelled
        if (deletedSubscription.customer) {
          const { error } = await supabase
            .from("User")
            .update({ role: "guest" })
            .eq("stripeCustomerId", deletedSubscription.customer)

          if (error) {
            console.error("Error updating user role after subscription cancellation:", error)
          }
        }
        break

      case "invoice.payment_failed":
        const failedInvoice = event.data.object as Stripe.Invoice
        console.log("Payment failed for invoice:", failedInvoice.id)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return new NextResponse("OK", { status: 200 })
  } catch (error: any) {
    console.error("Webhook processing error:", error)
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 500 })
  }
}
