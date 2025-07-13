import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const { toEmail, eventName, eventDate, eventLocation } = await req.json()

  if (!toEmail || !eventName || !eventDate || !eventLocation) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev", // Replace with your verified Resend domain
      to: toEmail,
      subject: `Confirmation: Your Ticket for ${eventName}`,
      html: `
        <p>Hello,</p>
        <p>This is a confirmation that your ticket for <strong>${eventName}</strong> has been successfully booked!</p>
        <p><strong>Date:</strong> ${eventDate}</p>
        <p><strong>Location:</strong> ${eventLocation}</p>
        <p>We look forward to seeing you there!</p>
        <p>Best regards,</p>
        <p>The Fan Club Team</p>
      `,
    })

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error })
  }
}
