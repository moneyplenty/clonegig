import { Resend } from "resend"
import { type NextRequest, NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { userEmail, eventTitle, ticketQuantity, totalPrice, specialRequests } = await request.json()

    const { data, error } = await resend.emails.send({
      from: "Kelvin Creekman Fan Club <noreply@kelvincreekman.com>",
      to: [userEmail],
      subject: `Event Booking Confirmed: ${eventTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #60a5fa; margin: 0; font-size: 28px;">🎸 Booking Confirmed!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Your spot is secured</p>
          </div>
          
          <div style="background: rgba(255, 255, 255, 0.1); padding: 25px; border-radius: 12px; margin-bottom: 25px;">
            <h2 style="color: #60a5fa; margin: 0 0 15px 0; font-size: 22px;">${eventTitle}</h2>
            
            <div style="display: grid; gap: 10px; margin-bottom: 20px;">
              <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.2);">
                <span>Tickets:</span>
                <span style="font-weight: bold;">${ticketQuantity}</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.2);">
                <span>Total Paid:</span>
                <span style="font-weight: bold; color: #34d399;">$${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            ${
              specialRequests
                ? `
              <div style="margin-top: 15px; padding: 15px; background: rgba(255, 255, 255, 0.1); border-radius: 8px;">
                <h4 style="margin: 0 0 8px 0; color: #60a5fa;">Special Requests:</h4>
                <p style="margin: 0; font-style: italic;">${specialRequests}</p>
              </div>
            `
                : ""
            }
          </div>
          
          <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 12px; margin-bottom: 25px;">
            <h3 style="color: #60a5fa; margin: 0 0 15px 0;">What's Next?</h3>
            <ul style="margin: 0; padding-left: 20px; line-height: 1.6;">
              <li>Save this email as your ticket confirmation</li>
              <li>You'll receive event details 24 hours before</li>
              <li>Join our Discord for event updates</li>
              <li>Follow @KelvinCreekman for behind-the-scenes content</li>
            </ul>
          </div>
          
          <div style="text-align: center; padding: 20px 0; border-top: 1px solid rgba(255, 255, 255, 0.2);">
            <p style="margin: 0; font-size: 14px; opacity: 0.8;">
              Can't wait to see you there! 🔥❄️
            </p>
            <p style="margin: 10px 0 0 0; font-size: 12px; opacity: 0.6;">
              Kelvin Creekman Fan Club Team
            </p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Email sending error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
