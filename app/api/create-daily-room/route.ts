import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { userId, sessionType } = await req.json()

  if (!userId || !sessionType) {
    return NextResponse.json({ error: "Missing userId or sessionType" }, { status: 400 })
  }

  try {
    const DAILY_API_KEY = process.env.DAILY_API_KEY
    if (!DAILY_API_KEY) {
      throw new Error("DAILY_API_KEY is not set in environment variables.")
    }

    const roomProperties = {
      properties: {
        nbf: Math.round(Date.now() / 1000), // now
        exp: Math.round(Date.now() / 1000) + 60 * 60, // 1 hour from now
        max_participants: 2,
        enable_prejoin_ui: true,
        eject_at_room_exp: true,
        // You can add more properties based on sessionType if needed
      },
    }

    const response = await fetch("https://api.daily.co/v1/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DAILY_API_KEY}`,
      },
      body: JSON.stringify(roomProperties),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Daily.co API error:", errorData)
      throw new Error(`Failed to create Daily.co room: ${errorData.info || response.statusText}`)
    }

    const data = await response.json()
    return NextResponse.json({ roomUrl: data.url })
  } catch (error: any) {
    console.error("Error creating Daily.co room:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
