import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { properties } = await request.json()

  if (!process.env.DAILY_API_KEY) {
    return NextResponse.json({ error: "Daily API key not configured" }, { status: 500 })
  }

  try {
    const response = await fetch("https://api.daily.co/v1/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DAILY_API_KEY}`,
      },
      body: JSON.stringify({
        properties: {
          enable_prejoin_ui: true,
          enable_knocking: true,
          ...properties,
        },
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Daily API error:", errorData)
      return NextResponse.json(
        { error: "Failed to create Daily room", details: errorData },
        { status: response.status },
      )
    }

    const room = await response.json()
    return NextResponse.json(room)
  } catch (error) {
    console.error("Error creating Daily room:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
