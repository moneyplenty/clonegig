import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { EmailTemplate } from "@/components/email-template"
import type * as React from "react"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { userEmail, eventName, eventDate, eventLocation } = await req.json()

    if (!userEmail || !eventName || !eventDate || !eventLocation) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { data, error } = await resend.emails.send({
      from: "Kelvin Creekman Fan Club <onboarding@resend.dev>", // Replace with your verified Resend domain
      to: [userEmail],
      subject: `Event Confirmation: ${eventName}`,
      react: EmailTemplate({
        firstName: userEmail.split("@")[0], // Simple way to get a first name
        message: `Your booking for the event "${eventName}" on ${new Date(eventDate).toLocaleString()} at ${eventLocation} has been confirmed!`,
      }) as React.ReactElement,
    })

    if (error) {
      console.error("Error sending event confirmation email:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error("Error in send-event-confirmation API:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
