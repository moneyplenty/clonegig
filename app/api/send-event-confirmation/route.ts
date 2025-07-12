import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      userName,
      userEmail,
      eventTitle,
      eventDate,
      eventTime,
      eventLocation,
      eventType,
      ticketPrice,
      specialRequests,
    } = body

    const { data, error } = await resend.emails.send({
      from: "Kelvin Creekman Fan Club <noreply@kelvincreekman.com>",
      to: [userEmail],
      subject: `Event Confirmation: ${eventTitle}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Event Confirmation</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            .container {
              background: white;
              border-radius: 15px;
              padding: 30px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 3px solid #667eea;
            }
            .logo {
              font-size: 28px;
              font-weight: bold;
              background: linear-gradient(135deg, #667eea, #764ba2);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              margin-bottom: 10px;
            }
            .title {
              color: #667eea;
              font-size: 24px;
              margin: 0;
            }
            .event-details {
              background: linear-gradient(135deg, #f8f9ff, #e8ecff);
              border-radius: 10px;
              padding: 25px;
              margin: 25px 0;
              border-left: 5px solid #667eea;
            }
            .detail-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 15px;
              padding-bottom: 10px;
              border-bottom: 1px solid #e0e6ff;
            }
            .detail-row:last-child {
              border-bottom: none;
              margin-bottom: 0;
            }
            .detail-label {
              font-weight: bold;
              color: #667eea;
              min-width: 120px;
            }
            .detail-value {
              color: #333;
              text-align: right;
              flex: 1;
            }
            .important-info {
              background: #fff3cd;
              border: 1px solid #ffeaa7;
              border-radius: 8px;
              padding: 20px;
              margin: 25px 0;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 2px solid #f0f0f0;
              color: #666;
            }
            .social-links {
              margin: 20px 0;
            }
            .social-links a {
              color: #667eea;
              text-decoration: none;
              margin: 0 10px;
              font-weight: bold;
            }
            .button {
              display: inline-block;
              background: linear-gradient(135deg, #667eea, #764ba2);
              color: white;
              padding: 12px 25px;
              text-decoration: none;
              border-radius: 25px;
              font-weight: bold;
              margin: 15px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">⚡ KELVIN CREEKMAN ⚡</div>
              <h1 class="title">Event Confirmation</h1>
            </div>
            
            <p>Hey ${userName}! 🎸</p>
            
            <p>Your ticket for <strong>${eventTitle}</strong> has been confirmed! We can't wait to see you there for what's going to be an absolutely electrifying experience.</p>
            
            <div class="event-details">
              <h3 style="color: #667eea; margin-top: 0;">📅 Event Details</h3>
              <div class="detail-row">
                <span class="detail-label">Event:</span>
                <span class="detail-value">${eventTitle}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span class="detail-value">${eventDate}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Time:</span>
                <span class="detail-value">${eventTime}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Location:</span>
                <span class="detail-value">${eventLocation}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Type:</span>
                <span class="detail-value">${eventType}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Price:</span>
                <span class="detail-value">$${ticketPrice}</span>
              </div>
            </div>
            
            ${
              specialRequests
                ? `
            <div class="important-info">
              <h4 style="margin-top: 0; color: #856404;">📝 Your Special Requests:</h4>
              <p style="margin-bottom: 0;">${specialRequests}</p>
            </div>
            `
                : ""
            }
            
            <div class="important-info">
              <h4 style="margin-top: 0; color: #856404;">🎫 Important Information:</h4>
              <ul style="margin-bottom: 0;">
                <li>Please arrive 30 minutes before the event starts</li>
                <li>Bring a valid ID for entry verification</li>
                <li>This confirmation email serves as your ticket</li>
                <li>No outside food or drinks allowed</li>
                <li>Merchandise will be available at the venue</li>
              </ul>
            </div>
            
            <div style="text-align: center;">
              <a href="https://kelvincreekman.com/events" class="button">View All Events</a>
            </div>
            
            <p>If you have any questions or need to make changes to your booking, please contact us at <a href="mailto:support@kelvincreekman.com">support@kelvincreekman.com</a></p>
            
            <p>Rock on! 🤘<br>
            <strong>The Kelvin Creekman Team</strong></p>
            
            <div class="footer">
              <div class="social-links">
                <a href="#">Instagram</a> |
                <a href="#">Twitter</a> |
                <a href="#">YouTube</a> |
                <a href="#">Spotify</a>
              </div>
              <p style="font-size: 12px; color: #999;">
                © 2024 Kelvin Creekman Fan Club. All rights reserved.<br>
                You're receiving this because you booked an event with us.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error("Error sending email:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error in send-event-confirmation:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
