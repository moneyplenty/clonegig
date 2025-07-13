import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const buf = await req.text()
  const sig = req.headers.get("stripe-signature")

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(buf, sig!, webhookSecret)
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.userId
      const totalAmount = session.amount_total
      const currency = session.currency

      if (userId && totalAmount && currency) {
        // Record the purchase in your database
        const { error } = await supabase.from("purchases").insert({
          user_id: userId,
          amount: totalAmount / 100, // Convert cents to dollars
          currency: currency,
          stripe_checkout_session_id: session.id,
          status: "completed",
        })

        if (error) {
          console.error("Error inserting purchase into DB:", error)
          return NextResponse.json({ error: "Database update failed" }, { status: 500 })
        }
        console.log(`Purchase recorded for user ${userId}, amount ${totalAmount / 100} ${currency.toUpperCase()}`)
      }
      break
    // Handle other event types as needed
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return NextResponse.json({ received: true }, { status: 200 })
}
