import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { createServiceRoleClient } from "@/lib/supabase/service-role"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
})

export async function POST(req: Request) {
  const supabase = createServerSupabaseClient()
  const serviceRoleSupabase = createServiceRoleClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const { items, customerEmail } = await req.json()

  if (!items || items.length === 0 || !customerEmail) {
    return new NextResponse("Missing required fields", { status: 400 })
  }

  try {
    // Check if the user already has a Stripe customer ID
    let stripeCustomerId: string | null = null
    const { data: existingCustomer, error: customerError } = await serviceRoleSupabase
      .from("stripe_customers")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .single()

    if (customerError && customerError.code !== "PGRST116") {
      // PGRST116 means no rows found, which is fine. Other errors are not.
      console.error("Error fetching existing Stripe customer:", customerError)
      throw new Error("Failed to fetch Stripe customer.")
    }

    if (existingCustomer) {
      stripeCustomerId = existingCustomer.stripe_customer_id
    } else {
      // Create a new Stripe customer if one doesn't exist
      const customer = await stripe.customers.create({
        email: customerEmail,
        metadata: {
          supabase_user_id: user.id,
        },
      })
      stripeCustomerId = customer.id

      // Store the new Stripe customer ID in your database
      const { error: insertCustomerError } = await serviceRoleSupabase
        .from("stripe_customers")
        .insert({ id: user.id, stripe_customer_id: stripeCustomerId })

      if (insertCustomerError) {
        console.error("Error inserting new Stripe customer:", insertCustomerError)
        throw new Error("Failed to save Stripe customer ID.")
      }
    }

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: item.image_url ? [item.image_url] : [],
        },
        unit_amount: Math.round(item.price * 100), // Price in cents
      },
      quantity: item.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId, // Use the retrieved or newly created customer ID
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
      metadata: {
        user_id: user.id,
        // You can add other metadata here, e.g., product IDs
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error("Stripe checkout error:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
