import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export async function POST(req: NextRequest) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // Verify admin user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Check if user is admin
  const { data: userData } = await supabase.from("User").select("role").eq("id", user.id).single()

  if (userData?.role !== "admin") {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 })
  }

  try {
    const { bookingId } = await req.json()

    if (!bookingId) {
      return NextResponse.json({ error: "Booking ID is required" }, { status: 400 })
    }

    // Create Daily.co room
    const roomName = `kelvin-meetgreet-${bookingId}-${Date.now()}`

    const dailyResponse = await fetch("https://api.daily.co/v1/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DAILY_API_KEY}`,
      },
      body: JSON.stringify({
        name: roomName,
        properties: {
          max_participants: 10,
          enable_screenshare: true,
          enable_chat: true,
          start_video_off: false,
          start_audio_off: false,
          exp: Math.floor(Date.now() / 1000) + 4 * 60 * 60, // 4 hours from now
        },
      }),
    })

    if (!dailyResponse.ok) {
      const errorData = await dailyResponse.json()
      throw new Error(`Daily.co API error: ${errorData.error || "Unknown error"}`)
    }

    const roomData = await dailyResponse.json()
    const roomUrl = roomData.url

    return NextResponse.json({ roomUrl })
  } catch (error: any) {
    console.error("Error creating Daily room:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
