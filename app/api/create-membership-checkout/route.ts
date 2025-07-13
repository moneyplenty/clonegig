import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
})

export async function POST(req: NextRequest) {
  try {
    const { tierName, tierPrice, stripePriceId } = await req.json()

    if (!tierName || !tierPrice || !stripePriceId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Kelvin Creekman Fan Club - ${tierName} Membership`,
              description: `Monthly subscription to ${tierName} tier`,
            },
            unit_amount: Math.round(tierPrice * 100), // Convert to cents
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.nextUrl.origin}/signup/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/signup?canceled=true`,
      metadata: {
        tierName,
        tierPrice: tierPrice.toString(),
      },
      allow_promotion_codes: true,
      billing_address_collection: "required",
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error: any) {
    console.error("Membership checkout error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
