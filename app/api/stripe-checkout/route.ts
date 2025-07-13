import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16", // Use your desired API version
})

export async function POST(req: NextRequest) {
  try {
    const { cartItems } = await req.json()

    if (!cartItems || cartItems.length === 0) {
      return new NextResponse("No items in cart", { status: 400 })
    }

    const line_items = cartItems.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image], // Assuming item.image is a URL
        },
        unit_amount: item.price * 100, // Price in cents
      },
      quantity: item.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${req.nextUrl.origin}/checkout?success=true`,
      cancel_url: `${req.nextUrl.origin}/checkout?canceled=true`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error("Stripe checkout error:", error)
    return new NextResponse(`Error creating checkout session: ${error.message}`, { status: 500 })
  }
}
