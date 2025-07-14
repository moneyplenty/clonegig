import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { to, meetGreetTitle, meetGreetDate, roomUrl } = await request.json()

  if (!to || !meetGreetTitle || !meetGreetDate || !roomUrl) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Creekman Meet & Greet <onboarding@resend.dev>", // Replace with your verified Resend domain
      to: [to],
      subject: `Meet & Greet Confirmation: ${meetGreetTitle}`,
      html: `
        <h1>Meet & Greet Confirmation</h1>
        <p>Dear fan,</p>
        <p>This email confirms your booking for the following Meet & Greet session:</p>
        <ul>
          <li><strong>Session Title:</strong> ${meetGreetTitle}</li>
          <li><strong>Date:</strong> ${new Date(meetGreetDate).toLocaleString()}</li>
          <li><strong>Join Link:</strong> <a href="${roomUrl}">${roomUrl}</a></li>
        </ul>
        <p>Please join the call a few minutes before the scheduled time.</p>
        <p>We look forward to seeing you!</p>
        <p>Best regards,</p>
        <p>The Creekman Team</p>
      `,
    })

    if (error) {
      console.error("Error sending meet & greet confirmation email:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: "Meet & Greet confirmation email sent successfully", data })
  } catch (error) {
    console.error("Error in send-meetgreet-confirmation API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
