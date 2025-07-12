import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { userName, userEmail, sessionDate, sessionTime, duration, specialRequests } = await request.json()

    const { data, error } = await resend.emails.send({
      from: "Kelvin Creekman Fan Club <noreply@kelvincreekman.com>",
      to: [userEmail],
      subject: "Meet & Greet Session Confirmed with Kelvin Creekman!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Meet & Greet Confirmation</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
            }
            .container {
              background: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            }
            .header {
              background: linear-gradient(135deg, #059669 0%, #06b6d4 100%);
              color: white;
              padding: 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              font-weight: bold;
            }
            .content {
              padding: 30px;
            }
            .session-details {
              background: #f0fdf4;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
              border-left: 4px solid #059669;
            }
            .detail-row {
              display: flex;
              justify-content: space-between;
              margin: 10px 0;
              padding: 8px 0;
              border-bottom: 1px solid #dcfce7;
            }
            .detail-row:last-child {
              border-bottom: none;
            }
            .label {
              font-weight: bold;
              color: #475569;
            }
            .value {
              color: #1e293b;
            }
            .highlight {
              background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
              padding: 15px;
              border-radius: 8px;
              margin: 20px 0;
              border-left: 4px solid #f59e0b;
            }
            .footer {
              background: #1e293b;
              color: white;
              padding: 20px;
              text-align: center;
            }
            .ice-accent {
              color: #06b6d4;
              font-weight: bold;
            }
            .fire-accent {
              color: #ef4444;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎤 Meet & Greet Confirmed! 🤝</h1>
              <p>Your personal session with Kelvin Creekman is all set!</p>
            </div>
            
            <div class="content">
              <h2>Hey ${userName}! 🎸</h2>
              <p>This is it! Your <strong class="ice-accent">personal meet & greet session</strong> with Kelvin Creekman has been confirmed. Get ready for an unforgettable experience!</p>
              
              <div class="session-details">
                <h3>📅 Session Details</h3>
                <div class="detail-row">
                  <span class="label">Date:</span>
                  <span class="value">${new Date(sessionDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Time:</span>
                  <span class="value">${sessionTime}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Duration:</span>
                  <span class="value">${duration} minutes</span>
                </div>
                <div class="detail-row">
                  <span class="label">Session Type:</span>
                  <span class="value">Personal Video Call</span>
                </div>
                ${
                  specialRequests
                    ? `
                <div class="detail-row">
                  <span class="label">Special Requests:</span>
                  <span class="value">${specialRequests}</span>
                </div>
                `
                    : ""
                }
              </div>
              
              <div class="highlight">
                <h3>🔥 How to Join Your Session</h3>
                <p><strong>You'll receive a video call link 15 minutes before your scheduled time.</strong> Make sure you're in a quiet space with good lighting and a stable internet connection.</p>
              </div>
              
              <h3>❄️ What to Expect</h3>
              <ul>
                <li><strong>Personal Conversation:</strong> Chat one-on-one with Kelvin</li>
                <li><strong>Photo Opportunity:</strong> Take screenshots during the call</li>
                <li><strong>Ask Questions:</strong> This is your time to connect!</li>
                <li><strong>Exclusive Access:</strong> Hear stories not shared anywhere else</li>
              </ul>
              
              <h3>🎸 Preparation Tips</h3>
              <ul>
                <li>Test your camera and microphone beforehand</li>
                <li>Prepare 2-3 questions you'd love to ask</li>
                <li>Have good lighting (face a window if possible)</li>
                <li>Find a quiet space where you won't be interrupted</li>
              </ul>
              
              <p><strong class="fire-accent">Important:</strong> Please be online and ready 5 minutes before your scheduled time. Late arrivals may result in a shortened session.</p>
              
              <p>If you need to reschedule or have any technical questions, contact us at <a href="mailto:meetgreet@kelvincreekman.com">meetgreet@kelvincreekman.com</a> at least 24 hours in advance.</p>
            </div>
            
            <div class="footer">
              <p><strong>Kelvin Creekman Fan Club</strong></p>
              <p>🔥 Personal. Exclusive. Unforgettable. ❄️</p>
              <p>Can't wait to see you there!</p>
            </div>
          </div>
        </body>
        </html>
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
