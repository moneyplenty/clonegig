import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const DAILY_API_KEY = process.env.DAILY_API_KEY
const DAILY_DOMAIN = process.env.DAILY_DOMAIN

export async function POST(request: Request) {
  if (!DAILY_API_KEY || !DAILY_DOMAIN) {
    return NextResponse.json({ error: "Daily.co API key or domain not configured" }, { status: 500 })
  }

  try {
    const { sessionId, userEmail, userName, sessionDate, sessionTime } = await request.json()

    // 1. Create or get Daily.co room
    // In a real application, you might check if a room already exists for this session ID
    // and create one only if it doesn't. For simplicity, we'll create a new one or use a fixed one.
    const roomName = `kelvin-creekman-meet-greet-${sessionId}` // Example: unique room per session
    const roomDuration = 60 * 30 // 30 minutes for the session

    const dailyRoomResponse = await fetch(`https://api.daily.co/v1/rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DAILY_API_KEY}`,
      },
      body: JSON.stringify({
        name: roomName,
        privacy: "private",
        properties: {
          enable_prejoin_ui: true,
          enable_knocking: true,
          max_participants: 10,
          exp: Math.floor(Date.now() / 1000) + roomDuration, // Room expires in 30 minutes
        },
      }),
    })

    let roomData
    if (dailyRoomResponse.status === 409) {
      // Room already exists
      const existingRoomResponse = await fetch(`https://api.daily.co/v1/rooms/${roomName}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${DAILY_API_KEY}`,
        },
      })
      roomData = await existingRoomResponse.json()
    } else if (dailyRoomResponse.ok) {
      roomData = await dailyRoomResponse.json()
    } else {
      const errorText = await dailyRoomResponse.text()
      console.error("Daily.co room creation error:", errorText)
      throw new Error(`Failed to create Daily.co room: ${dailyRoomResponse.statusText} - ${errorText}`)
    }

    const roomUrl = roomData.url

    // 2. Send confirmation email using Resend
    const emailResponse = await resend.emails.send({
      from: "Kelvin Creekman Fan Club <no-reply@kelvincreekman.com>", // Replace with your verified domain
      to: [userEmail],
      subject: `Your Meet & Greet Session with Kelvin Creekman`,
      html: `
        <h1>Meet & Greet Confirmation</h1>
        <p>Dear ${userName},</p>
        <p>Your virtual meet & greet session with Kelvin Creekman has been successfully booked!</p>
        <p>Here are your session details:</p>
        <ul>
          <li><strong>Date:</strong> ${sessionDate}</li>
          <li><strong>Time:</strong> ${sessionTime}</li>
          <li><strong>Join Link:</strong> <a href="${roomUrl}">${roomUrl}</a></li>
        </ul>
        <p>Please join the call a few minutes before the scheduled time.</p>
        <p>We look forward to seeing you there!</p>
        <p>Best regards,</p>
        <p>The Kelvin Creekman Fan Club Team</p>
      `,
    })

    if (!emailResponse.data) {
      console.error("Resend email error:", emailResponse.error)
      throw new Error(`Failed to send confirmation email: ${emailResponse.error?.message}`)
    }

    return NextResponse.json({ message: "Booking confirmed and email sent!", roomUrl })
  } catch (error: any) {
    console.error("Error in create-daily-room API:", error)
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 })
  }
}
