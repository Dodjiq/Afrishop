import { NextRequest, NextResponse } from "next/server"
import { sendWelcomeEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name } = body

    if (!email || !name) {
      return NextResponse.json(
        { error: "Email and name are required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Send welcome email
    const result = await sendWelcomeEmail({ to: email, name })

    if (!result.success) {
      console.error("Failed to send welcome email:", result.error)
      return NextResponse.json(
        { error: "Failed to send welcome email" },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: "Welcome email sent successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error in send-welcome-email route:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
