import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { to, eventName, eventDate, eventLocation } = await request.json()

  if (!to || !eventName || !eventDate || !eventLocation) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Creekman Events <onboarding@resend.dev>", // Replace with your verified Resend domain
      to: [to],
      subject: `Event Confirmation: ${eventName}`,
      html: `
        <h1>Event Confirmation</h1>
        <p>Dear fan,</p>
        <p>This email confirms your booking for the following event:</p>
        <ul>
          <li><strong>Event Name:</strong> ${eventName}</li>
          <li><strong>Date:</strong> ${new Date(eventDate).toLocaleString()}</li>
          <li><strong>Location:</strong> ${eventLocation}</li>
        </ul>
        <p>We look forward to seeing you there!</p>
        <p>Best regards,</p>
        <p>The Creekman Team</p>
      `,
    })

    if (error) {
      console.error("Error sending event confirmation email:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: "Event confirmation email sent successfully", data })
  } catch (error) {
    console.error("Error in send-event-confirmation API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
