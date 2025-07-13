import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { eventName, quantity, totalPrice, userEmail } = await req.json()

    if (!eventName || !quantity || !totalPrice || !userEmail) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const { data, error } = await resend.emails.send({
      from: "Kelvin Creekman Fan Club <onboarding@resend.dev>", // Replace with your verified Resend domain
      to: [userEmail],
      subject: `Event Ticket Confirmation: ${eventName}`,
      html: `
        <h1>Thank You for Your Purchase!</h1>
        <p>Dear Fan,</p>
        <p>Your booking for <strong>${eventName}</strong> has been confirmed.</p>
        <p>Details:</p>
        <ul>
          <li>Tickets: ${quantity}</li>
          <li>Total Paid: $${totalPrice}</li>
        </ul>
        <p>We look forward to seeing you there!</p>
        <p>Best,</p>
        <p>The Kelvin Creekman Fan Club Team</p>
      `,
    })

    if (error) {
      console.error("Resend email error:", error)
      return new NextResponse(`Failed to send email: ${error.message}`, { status: 500 })
    }

    return NextResponse.json({ message: "Confirmation email sent successfully", data })
  } catch (error: any) {
    console.error("Error in send-event-confirmation API:", error)
    return new NextResponse(`Internal server error: ${error.message}`, { status: 500 })
  }
}
