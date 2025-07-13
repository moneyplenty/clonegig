import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { createClient } from "@/lib/supabase/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { bookingId, userId, roomUrl } = await request.json()

  if (!bookingId || !userId) {
    return NextResponse.json({ error: "Booking ID and User ID are required" }, { status: 400 })
  }

  try {
    // Fetch booking details
    const { data: booking, error: bookingError } = await supabase
      .from("meet_and_greet_bookings")
      .select("*")
      .eq("id", bookingId)
      .single()

    if (bookingError || !booking) {
      console.error("Error fetching booking:", bookingError)
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    // Fetch user details
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("email, full_name")
      .eq("id", userId)
      .single()

    if (profileError || !profile) {
      console.error("Error fetching user profile:", profileError)
      return NextResponse.json({ error: "User profile not found" }, { status: 404 })
    }

    const userName = profile.full_name || profile.email
    const sessionDate = new Date(booking.session_time).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })

    const { data, error } = await resend.emails.send({
      from: "Kelvin Creekman Fan Club <onboarding@resend.dev>", // Replace with your verified Resend domain
      to: profile.email,
      subject: `Your Meet & Greet Session Confirmation - ${booking.session_title}`,
      html: `
        &lt;!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Meet & Greet Confirmation</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            }
            .container {
              background: white;
              border-radius: 15px;
              padding: 30px;
              box-shadow: 0 15px 35px rgba(0,0,0,0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              padding-bottom: 20px;
              border-bottom: 3px solid #1e3c72;
            }
            .logo {
              font-size: 28px;
              font-weight: bold;
              background: linear-gradient(135deg, #1e3c72, #2a5298);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              margin-bottom: 10px;
            }
            .title {
              color: #1e3c72;
              font-size: 24px;
              margin: 0;
            }
            .session-details {
              background: linear-gradient(135deg, #f0f8ff, #e6f3ff);
              border-radius: 10px;
              padding: 25px;
              margin: 25px 0;
              border-left: 5px solid #1e3c72;
            }
            .detail-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 15px;
              padding-bottom: 10px;
              border-bottom: 1px solid #d6ebff;
            }
            .detail-row:last-child {
              border-bottom: none;
              margin-bottom: 0;
            }
            .detail-label {
              font-weight: bold;
              color: #1e3c72;
              min-width: 140px;
            }
            .detail-value {
              color: #333;
              text-align: right;
              flex: 1;
            }
            .tech-requirements {
              background: #e8f5e8;
              border: 1px solid #c3e6c3;
              border-radius: 8px;
              padding: 20px;
              margin: 25px 0;
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
              color: #1e3c72;
              text-decoration: none;
              margin: 0 10px;
              font-weight: bold;
            }
            .button {
              display: inline-block;
              background: linear-gradient(135deg, #1e3c72, #2a5298);
              color: white;
              padding: 12px 25px;
              text-decoration: none;
              border-radius: 25px;
              font-weight: bold;
              margin: 15px 0;
            }
            .highlight {
              background: linear-gradient(135deg, #ff6b6b, #ee5a24);
              color: white;
              padding: 15px;
              border-radius: 8px;
              text-align: center;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">❄️ KELVIN CREEKMAN ⚡</div>
              <h1 class="title">Meet & Greet Confirmed!</h1>
            </div>
            
            <p>Hey ${userName}! 🎸</p>
            
            <p>Your Meet & Greet session with Kelvin Creekman has been successfully confirmed!</p>
            
            <div class="session-details">
              <h3 style="color: #1e3c72; margin-top: 0;">🎥 Session Details</h3>
              <div class="detail-row">
                <span class="detail-label">Session Type:</span>
                <span class="detail-value">${booking.session_type}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Date & Time:</span>
                <span class="detail-value">${sessionDate}</span>
              </div>
              ${
                roomUrl
                  ? `<div class="detail-row">
                <span class="detail-label">Join Link:</span>
                <span class="detail-value"><a href="${roomUrl}">${roomUrl}</a></span>
              </div>`
                  : ""
              }
            </div>
            
            <div class="tech-requirements">
              <h4 style="margin-top: 0; color: #2d5016;">💻 Technical Requirements:</h4>
              <ul style="margin-bottom: 0;">
                <li>Stable internet connection (minimum 5 Mbps recommended)</li>
                <li>Device with camera and microphone (computer, tablet, or smartphone)</li>
                <li>Updated web browser (Chrome, Firefox, Safari, or Edge)</li>
                <li>Quiet environment for the best audio experience</li>
                <li>Good lighting so Kelvin can see you clearly</li>
              </ul>
            </div>
            
            <div class="important-info">
              <h4 style="margin-top: 0; color: #856404;">⚡ Important Reminders:</h4>
              <ul style="margin-bottom: 0;">
                <li>Please join the room a few minutes before your scheduled time.</li>
                <li>Have your questions ready - this is your chance to connect with Kelvin!</li>
                <li>Check your email for any last-minute updates</li>
              </ul>
            </div>
            
            <div style="text-align: center;">
              <a href="https://kelvincreekman.com/meet-and-greet" class="button">Join Session (Link will be active 30 min before)</a>
            </div>
            
            <p>If you have any questions or need technical support, please contact us at <a href="mailto:support@kelvincreekman.com">support@kelvincreekman.com</a></p>
            
            <p>Can't wait to meet you! 🤘<br>
            <strong>Kelvin & The Team</strong></p>
            
            <div class="footer">
              <div class="social-links">
                <a href="#">Instagram</a> |
                <a href="#">Twitter</a> |
                <a href="#">YouTube</a> |
                <a href="#">Spotify</a>
              </div>
              <p style="font-size: 12px; color: #999;">
                © 2024 Kelvin Creekman Fan Club. All rights reserved.<br>
                You're receiving this because you booked a meet & greet session.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error("Resend email error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error("Error sending meet & greet confirmation email:", error)
    return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 })
  }
}
