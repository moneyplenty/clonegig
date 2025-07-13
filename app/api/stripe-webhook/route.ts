import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@/lib/supabase/server"
import { v4 as uuidv4 } from "uuid" // For generating unique room IDs

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error(`Webhook signature verification failed.`, err.message)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  const supabase = await createClient()

  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session

        // Retrieve line items to get product details
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
          expand: ["data.price.product"],
        })

        for (const item of lineItems.data) {
          const product = item.price?.product as Stripe.Product
          const customType = product.metadata?.type // Assuming you set a 'type' metadata on Stripe Product

          if (customType === "meet_and_greet") {
            const userId = session.metadata?.userId // Get userId from session metadata
            const sessionId = product.metadata?.sessionId // Get sessionId from product metadata

            if (userId && sessionId) {
              // Generate a unique room URL for Signal (for demo purposes)
              // In a real app, you'd integrate with a video call service API here
              const roomUrl = `https://signal.example.com/room/${uuidv4()}`

              const { data, error } = await supabase
                .from("meet_and_greet_bookings")
                .update({
                  payment_status: "completed",
                  room_url: roomUrl,
                })
                .eq("user_id", userId)
                .eq("session_id", sessionId) // Assuming a booking record already exists as 'pending'

              if (error) {
                console.error("Error updating meet_and_greet_bookings:", error)
                return NextResponse.json({ error: "Database Error" }, { status: 500 })
              }
              console.log(`Meet & Greet booking updated for user ${userId} with room: ${roomUrl}`)
            }
          } else if (customType === "merchandise") {
            // Handle merchandise purchase (e.g., update order status, reduce stock)
            console.log(`Merchandise purchased: ${product.name}`)
            // Example: Update an 'orders' table
            const { error } = await supabase.from("orders").insert({
              user_id: session.metadata?.userId,
              product_id: product.id,
              quantity: item.quantity,
              total_amount: item.amount_total ? item.amount_total / 100 : 0,
              status: "completed",
            })
            if (error) {
              console.error("Error inserting order:", error)
              return NextResponse.json({ error: "Database Error" }, { status: 500 })
            }
          }
        }
        break

      case "payment_intent.succeeded":
        // Handle payment_intent.succeeded if needed for other flows
        break

      default:
        console.warn(`Unhandled event type ${event.type}`)
    }
  } catch (error) {
    console.error("Error handling webhook:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
