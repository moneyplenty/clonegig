
import { NextResponse } from "next/server"

export async function POST() {
  return NextResponse.json({ 
    error: "Daily.co has been removed. This project now uses Signal for video calls." 
  }, { status: 410 })
}
