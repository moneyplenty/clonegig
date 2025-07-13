import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

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
    const { bookingId, message } = await req.json()

    if (!bookingId || !message) {
      return NextResponse.json({ error: "Booking ID and message are required" }, { status: 400 })
    }

    // Get booking details
    const { data: booking, error: bookingError } = await supabase
      .from("MeetGreetBooking")
      .select(`
        *,
        user:User(email),
        event:Event(title)
      `)
      .eq("id", bookingId)
      .single()

    if (bookingError || !booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    // Send signal email to user
    await resend.emails.send({
      from: "Kelvin Creekman <admin@kelvincreekman.com>",
      to: [booking.user.email],
      subject: `Message from Kelvin - ${booking.event.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">Message from Kelvin</h2>
          <p>Hi there!</p>
          <p>Kelvin has sent you a message regarding your upcoming meet & greet session:</p>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-style: italic;">"${message}"</p>
          </div>
          <p><strong>Session Details:</strong></p>
          <ul>
            <li>Event: ${booking.event.title}</li>
            <li>Date: ${new Date(booking.scheduledAt).toLocaleString()}</li>
            <li>Type: ${booking.sessionType.replace("_", " ")}</li>
          </ul>
          ${
            booking.dailyRoomUrl
              ? `
            <p><strong>Video Call Link:</strong></p>
            <a href="${booking.dailyRoomUrl}" style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Join Video Call</a>
          `
              : ""
          }
          <p>Looking forward to meeting you!</p>
          <p>Best regards,<br>Kelvin Creekman</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error sending signal:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
