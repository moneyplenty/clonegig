import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userEmail, eventName, eventDate, eventTime, eventLocation, quantity, totalPrice } = body

    if (!userEmail || !eventName || !eventDate || !eventTime || !eventLocation || !quantity || !totalPrice) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const data = await resend.emails.send({
      from: "Kelvin Creekman Fan Club <onboarding@resend.dev>", // Replace with your verified Resend domain
      to: [userEmail],
      subject: `Event Booking Confirmation: ${eventName}`,
      html: `
        <h1>Event Booking Confirmation</h1>
        <p>Dear Fan,</p>
        <p>Thank you for booking your tickets for <strong>${eventName}</strong>!</p>
        <p>Here are your event details:</p>
        <ul>
          <li><strong>Event:</strong> ${eventName}</li>
          <li><strong>Date:</strong> ${eventDate}</li>
          <li><strong>Time:</strong> ${eventTime}</li>
          <li><strong>Location:</strong> ${eventLocation}</li>
          <li><strong>Tickets:</strong> ${quantity}</li>
          <li><strong>Total Price:</strong> $${totalPrice}</li>
        </ul>
        <p>We look forward to seeing you there!</p>
        <p>Best regards,</p>
        <p>The Kelvin Creekman Fan Club Team</p>
      `,
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error sending event confirmation email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
