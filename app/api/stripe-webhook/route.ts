import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { PrismaClient } from "@prisma/client"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
})

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const buf = await req.text()
  const sig = req.headers.get("stripe-signature")

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(buf, sig!, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session
      console.log("Checkout session completed:", session.id)

      // Retrieve metadata
      const userId = session.metadata?.userId
      const cartItemsString = session.metadata?.cartItems

      if (!userId || !cartItemsString) {
        console.error("Missing userId or cartItems in session metadata")
        return NextResponse.json({ error: "Missing metadata" }, { status: 400 })
      }

      try {
        const cartItems = JSON.parse(cartItemsString)

        const order = await prisma.order.create({
          data: {
            userId: userId,
            stripeSessionId: session.id,
            totalAmount: session.amount_total ? session.amount_total / 100 : 0, // Convert cents to dollars
            status: "completed",
            orderItems: {
              create: cartItems.map((item: any) => ({
                productId: item.id,
                quantity: item.quantity,
                price: item.price,
                name: item.name,
                image: item.image,
              })),
            },
          },
        })
        console.log("Order saved to database:", order.id)
      } catch (dbError) {
        console.error("Error saving order to database:", dbError)
        return NextResponse.json({ error: "Failed to save order" }, { status: 500 })
      }
      break
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return NextResponse.json({ received: true }, { status: 200 })
}
