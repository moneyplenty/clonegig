import { NextResponse } from "next/server"

export async function POST() {
  // Daily.co integration removed as per instructions
  return NextResponse.json({ 
    error: "Daily.co integration removed. Using Signal video calls instead." 
  }, { status: 400 })
}