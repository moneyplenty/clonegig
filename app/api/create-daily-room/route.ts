import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { roomName } = await req.json()

    if (!roomName) {
      return new NextResponse("Room name is required", { status: 400 })
    }

    const DAILY_API_KEY = process.env.DAILY_API_KEY
    const DAILY_DOMAIN = process.env.DAILY_DOMAIN

    if (!DAILY_API_KEY || !DAILY_DOMAIN) {
      return new NextResponse("Server configuration error: Daily API key or domain missing.", { status: 500 })
    }

    const response = await fetch(`https://api.daily.co/v1/rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DAILY_API_KEY}`,
      },
      body: JSON.stringify({
        name: roomName,
        properties: {
          exp: Math.round(Date.now() / 1000) + 60 * 60, // Room expires in 1 hour
          enable_screenshare: true,
          enable_chat: true,
          start_video_off: false,
          start_audio_off: false,
          max_participants: 2, // Kelvin and one fan
        },
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Daily.co API error:", errorData)
      return new NextResponse(`Failed to create Daily room: ${errorData.info}`, { status: response.status })
    }

    const room = await response.json()
    return NextResponse.json({ url: room.url })
  } catch (error) {
    console.error("Error creating Daily room:", error)
    return new NextResponse("Internal server error", { status: 500 })
  }
}
