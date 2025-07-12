import { Resend } from "resend"
import { type NextRequest, NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { userEmail, sessionDate, sessionTime, sessionType } = await request.json()

    const { data, error } = await resend.emails.send({
      from: "Kelvin Creekman Fan Club <noreply@kelvincreekman.com>",
      to: [userEmail],
      subject: `Meet & Greet Session Confirmed - ${sessionDate}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); color: white;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #c4b5fd; margin: 0; font-size: 28px;">🎥 Meet & Greet Confirmed!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Your personal session with Kelvin</p>
          </div>
          
          <div style="background: rgba(255, 255, 255, 0.1); padding: 25px; border-radius: 12px; margin-bottom: 25px;">
            <h2 style="color: #c4b5fd; margin: 0 0 15px 0; font-size: 22px;">Session Details</h2>
            
            <div style="display: grid; gap: 10px; margin-bottom: 20px;">
              <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.2);">
                <span>📅 Date:</span>
                <span style="font-weight: bold;">${sessionDate}</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.2);">
                <span>⏰ Time:</span>
                <span style="font-weight: bold;">${sessionTime}</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.2);">
                <span>🎬 Type:</span>
                <span style="font-weight: bold;">${sessionType}</span>
              </div>
            </div>
          </div>
          
          <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 12px; margin-bottom: 25px;">
            <h3 style="color: #c4b5fd; margin: 0 0 15px 0;">Before Your Session:</h3>
            <ul style="margin: 0; padding-left: 20px; line-height: 1.6;">
              <li>Test your camera and microphone</li>
              <li>Prepare any questions you'd like to ask</li>
              <li>Join 5 minutes early for tech check</li>
              <li>Have good lighting and stable internet</li>
            </ul>
          </div>
          
          <div style="text-align: center; padding: 20px; background: rgba(34, 197, 94, 0.2); border-radius: 12px; margin-bottom: 25px;">
            <h3 style="color: #4ade80; margin: 0 0 10px 0;">Join Link</h3>
            <p style="margin: 0; font-size: 14px; opacity: 0.9;">
              You'll receive the video call link 30 minutes before your session
            </p>
          </div>
          
          <div style="text-align: center; padding: 20px 0; border-top: 1px solid rgba(255, 255, 255, 0.2);">
            <p style="margin: 0; font-size: 14px; opacity: 0.8;">
              Looking forward to meeting you personally! 🤘
            </p>
            <p style="margin: 10px 0 0 0; font-size: 12px; opacity: 0.6;">
              Kelvin Creekman
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
