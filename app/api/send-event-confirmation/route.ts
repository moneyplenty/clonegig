import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { EmailTemplate } from "@/components/email-template"
import type * as React from "react"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { toEmail, eventTitle, eventDate, eventLocation, quantity } = await req.json()

    if (!toEmail || !eventTitle || !eventDate || !eventLocation || !quantity) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    const { data, error } = await resend.emails.send({
      from: "Kelvin Creekman Fan Club <no-reply@yourdomain.com>", // Replace with your verified domain
      to: [toEmail],
      subject: `Event Confirmation: ${eventTitle}`,
      react: EmailTemplate({
        type: "event-confirmation",
        eventTitle,
        eventDate,
        eventLocation,
        quantity,
      }) as React.ReactElement,
    })

    if (error) {
      console.error("Resend email error:", error)
      return new NextResponse(`Failed to send email: ${error.message}`, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error("API error:", error)
    return new NextResponse(`Internal Server Error: ${error.message}`, { status: 500 })
  }
}
