import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@/lib/supabase/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(req: NextRequest) {
  try {
    const { items, type = "store", sessionId } = await req.json()
    const supabase = await createClient()

    // Get the current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []
    const metadata: Record<string, string> = {
      userId: user.id,
      type,
    }

    if (type === "store") {
      // Store checkout
      line_items = items.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      }))
    } else if (type === "meet-and-greet") {
      // Meet and greet session
      metadata.sessionId = sessionId
      line_items = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Private Meet & Greet Session",
              description: "One-on-one video call with Kelvin Creekman",
            },
            unit_amount: Math.round(items.price * 100),
          },
          quantity: 1,
        },
      ]
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${req.nextUrl.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/checkout/cancel`,
      customer_email: user.email,
      metadata,
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error("Stripe checkout error:", error)
    return NextResponse.json({ error: `Error creating checkout session: ${error.message}` }, { status: 500 })
  }
}
