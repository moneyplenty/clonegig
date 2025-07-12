import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { eventTitle, userName, userEmail, eventDate, eventTime, eventLocation, price, specialRequests } =
      await request.json()

    const { data, error } = await resend.emails.send({
      from: "Kelvin Creekman Fan Club <noreply@kelvinCreekman.com>",
      to: [userEmail],
      subject: `Event Booking Confirmed: ${eventTitle}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Event Booking Confirmation</title>
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
              background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
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
            .event-details {
              background: #f8fafc;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
              border-left: 4px solid #3b82f6;
            }
            .detail-row {
              display: flex;
              justify-content: space-between;
              margin: 10px 0;
              padding: 8px 0;
              border-bottom: 1px solid #e2e8f0;
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
            .price {
              font-size: 24px;
              font-weight: bold;
              color: #059669;
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
              <h1>🎸 Event Booking Confirmed! ❄️</h1>
              <p>Get ready for an electrifying experience with Kelvin Creekman</p>
            </div>
            
            <div class="content">
              <h2>Hello ${userName}! 👋</h2>
              <p>Your booking for <strong class="ice-accent">${eventTitle}</strong> has been confirmed! We're excited to see you there.</p>
              
              <div class="event-details">
                <h3>📅 Event Details</h3>
                <div class="detail-row">
                  <span class="label">Event:</span>
                  <span class="value">${eventTitle}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Date:</span>
                  <span class="value">${new Date(eventDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Time:</span>
                  <span class="value">${eventTime}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Location:</span>
                  <span class="value">${eventLocation}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Total Paid:</span>
                  <span class="value price">$${price}</span>
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
              
              <h3>🔥 What to Expect</h3>
              <ul>
                <li>Arrive 30 minutes early for check-in</li>
                <li>Bring a valid ID for entry</li>
                <li>Photography may be restricted during certain segments</li>
                <li>Merchandise will be available for purchase</li>
              </ul>
              
              <p><strong class="fire-accent">Important:</strong> Please save this email as your booking confirmation. You may be asked to present it at the venue.</p>
              
              <p>If you have any questions or need to make changes to your booking, please contact us at <a href="mailto:support@kelvincreekman.com">support@kelvincreekman.com</a></p>
            </div>
            
            <div class="footer">
              <p><strong>Kelvin Creekman Fan Club</strong></p>
              <p>🔥 Fire & Ice Experience ❄️</p>
              <p>Thank you for being an amazing fan!</p>
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
