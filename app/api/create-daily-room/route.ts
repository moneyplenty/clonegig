import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { roomName } = await req.json()

    if (!roomName) {
      return NextResponse.json({ error: "Room name is required" }, { status: 400 })
    }

    const DAILY_API_KEY = process.env.DAILY_API_KEY
    const DAILY_DOMAIN = process.env.DAILY_DOMAIN

    if (!DAILY_API_KEY || !DAILY_DOMAIN) {
      return NextResponse.json({ error: "Daily.co API key or domain not configured" }, { status: 500 })
    }

    const response = await fetch(`https://api.daily.co/v1/rooms`, {
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
          max_participants: 2, // 1 for Kelvin, 1 for fan
          exp: Math.round(Date.now() / 1000) + 60 * 60, // Room expires in 1 hour
        },
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Daily.co API error:", errorData)
      return NextResponse.json(
        { error: "Failed to create Daily.co room", details: errorData },
        { status: response.status },
      )
    }

    const room = await response.json()
    return NextResponse.json({ roomUrl: room.url })
  } catch (error: any) {
    console.error("Error creating Daily.co room:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
