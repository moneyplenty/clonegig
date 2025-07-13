import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { eventId, userId } = await req.json()

    if (!eventId || !userId) {
      return new NextResponse("Missing eventId or userId", { status: 400 })
    }

    const DAILY_API_KEY = process.env.DAILY_API_KEY
    const DAILY_DOMAIN = process.env.DAILY_DOMAIN

    if (!DAILY_API_KEY || !DAILY_DOMAIN) {
      return new NextResponse("Daily.co API key or domain not configured", { status: 500 })
    }

    const roomName = `kelvin-meet-greet-${eventId}-${userId}` // Unique room name

    const response = await fetch(`https://api.daily.co/v1/rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DAILY_API_KEY}`,
      },
      body: JSON.stringify({
        name: roomName,
        properties: {
          enable_prejoin_ui: true,
          enable_knocking: true,
          max_participants: 5, // Example: limit meet & greet to 5 participants
          exp: Math.round(Date.now() / 1000) + 60 * 60, // Room expires in 1 hour
        },
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Daily.co API error:", errorData)
      return new NextResponse(`Failed to create Daily.co room: ${errorData.info}`, { status: 500 })
    }

    const room = await response.json()
    const roomUrl = `https://${DAILY_DOMAIN}/${room.name}`

    return NextResponse.json({ roomUrl })
  } catch (error: any) {
    console.error("API error:", error)
    return new NextResponse(`Internal Server Error: ${error.message}`, { status: 500 })
  }
}
