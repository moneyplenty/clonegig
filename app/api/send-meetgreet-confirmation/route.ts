import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { EmailTemplate } from "@/components/email-template"
import type * as React from "react"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      userName,
      userEmail,
      sessionDate,
      sessionTime,
      sessionType,
      sessionDuration,
      sessionPrice,
      contactInfo,
      specialRequests,
      preferredTime,
      roomUrl,
      userQuestion,
      date,
      time,
      eventName,
      eventDate,
      eventLocation,
      dailyRoomUrl,
    } = body

    if (!userEmail || !eventName || !eventDate || !eventLocation || !dailyRoomUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const isPrivateSession =
      sessionType?.includes("WHATSAPP") || sessionType?.includes("FACETIME") || sessionType?.includes("Private")

    const { data, error } = await resend.emails.send({
      from: "Kelvin Creekman Fan Club <onboarding@resend.dev>", // Replace with your verified Resend domain
      to: [userEmail],
      subject: isPrivateSession
        ? `Meet & Greet Confirmation: ${userName}`
        : `Meet & Greet Session Confirmation: ${eventName}`,
      react: EmailTemplate({
        firstName: userEmail.split("@")[0], // Simple way to get a first name
        message: isPrivateSession
          ? `Hey ${userName || "Fan"}! 🎸

              <div class="highlight">
                <h3 style="margin: 0 0 10px 0;">🔥 PRIVATE SESSION BOOKED! 🔥</h3>
                <p style="margin: 0;">Kelvin will personally contact you within 24 hours to schedule your exclusive session!</p>
              </div>
              
              <p>You've just booked an exclusive private session with Kelvin! This is going to be an incredible one-on-one experience that you'll never forget.</p>`
          : `Your Meet & Greet session for "${eventName}" on ${new Date(eventDate).toLocaleString()} at ${eventLocation} has been confirmed!
              Please join the session using this link: ${dailyRoomUrl}`,
        sessionDetails: `
          <div class="session-details">
            <h3 style="color: #1e3c72; margin-top: 0;">🎥 Session Details</h3>
            <div class="detail-row">
              <span class="detail-label">Session Type:</span>
              <span class="detail-value">${sessionType}</span>
            </div>
            ${
              sessionDate || date
                ? `
              <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span class="detail-value">${sessionDate || date}</span>
              </div>
              `
                : ""
            }
            ${
              sessionTime || time
                ? `
              <div class="detail-row">
                <span class="detail-label">Time:</span>
                <span class="detail-value">${sessionTime || time}</span>
              </div>
              `
                : ""
            }
            ${
              sessionDuration
                ? `
              <div class="detail-row">
                <span class="detail-label">Duration:</span>
                <span class="detail-value">${sessionDuration}</span>
              </div>
              `
                : ""
            }
            ${
              sessionPrice
                ? `
              <div class="detail-row">
                <span class="detail-label">Price:</span>
                <span class="detail-value">${sessionPrice}</span>
              </div>
              `
                : ""
            }
            ${
              contactInfo
                ? `
              <div class="detail-row">
                <span class="detail-label">Contact Info:</span>
                <span class="detail-value">${contactInfo}</span>
              </div>
              `
                : ""
            }
            ${
              preferredTime
                ? `
              <div class="detail-row">
                <span class="detail-label">Preferred Time:</span>
                <span class="detail-value">${preferredTime}</span>
              </div>
              `
                : ""
            }
            <div class="detail-row">
              <span class="detail-label">Join Link:</span>
              <span class="detail-value"><a href="${roomUrl || dailyRoomUrl}">${roomUrl || dailyRoomUrl}</a></span>
            </div>
            ${userQuestion ? `<div class="detail-row"><span class="detail-label">Your Question:</span><span class="detail-value">${userQuestion}</span></div>` : ""}
          </div>
        `,
        specialRequests: specialRequests
          ? `
          <div class="important-info">
            <h4 style="margin-top: 0; color: #856404;">📝 Your Special Requests:</h4>
            <p style="margin-bottom: 0;">${specialRequests}</p>
          </div>
          `
          : "",
        techRequirements: isPrivateSession
          ? `
          <div class="tech-requirements">
            <h4 style="margin-top: 0; color: #2d5016;">📱 Next Steps for Private Session:</h4>
            <ul style="margin-bottom: 0;">
              <li><strong>Kelvin will contact you directly</strong> within 24 hours using the contact information you provided</li>
              <li>He'll work with you to find the perfect time that works for both of you</li>
              <li>Make sure your device is charged and you have a stable internet connection</li>
              <li>Find a quiet, well-lit space for the best experience</li>
              <li>Prepare any questions or topics you'd like to discuss</li>
              ${sessionType?.includes("WHATSAPP") ? "<li>Ensure your WhatsApp is updated and working properly</li>" : ""}
              ${sessionType?.includes("FACETIME") ? "<li>Make sure your Apple ID is set up correctly for FaceTime</li>" : ""}
              ${sessionType?.includes("video") ? "<li>We'll send you a secure video link before the session</li>" : ""}
            </ul>
          </div>
          `
          : `
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
          `,
        importantInfo: `
          <div class="important-info">
            <h4 style="margin-top: 0; color: #856404;">⚡ Important Reminders:</h4>
            <ul style="margin-bottom: 0;">
              ${
                isPrivateSession
                  ? `
              <li>This is a private, exclusive session - please keep it personal and don't record without permission</li>
              <li>Payment will be processed after the session is completed</li>
              <li>If you need to reschedule, contact us at least 24 hours in advance</li>
              `
                  : `
              <li>Join the session 5-10 minutes early to test your connection</li>
              <li>Be respectful of other participants and wait your turn to speak</li>
              <li>Recording is not permitted to protect everyone's privacy</li>
              `
              }
              <li>Have your questions ready - this is your chance to connect with Kelvin!</li>
              <li>Check your email for any last-minute updates</li>
            </ul>
          </div>
        `,
        joinButton: !isPrivateSession
          ? `
          <div style="text-align: center;">
            <a href="https://kelvincreekman.com/meet-and-greet" class="button">Join Session (Link will be active 30 min before)</a>
          </div>
          `
          : "",
        supportLink: `
          <p>If you have any questions or need technical support, please contact us at <a href="mailto:support@kelvincreekman.com">support@kelvincreekman.com</a></p>
        `,
        footer: `
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
        `,
      }) as React.ReactElement,
    })

    if (error) {
      console.error("Error sending email:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error("Error in send-meetgreet-confirmation:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
