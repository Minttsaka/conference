import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"


export async function POST(request: Request) {
  try {

    const {messageId , emoji, userId } = await request.json()
    // Validate required fields
    if (!messageId || !emoji) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create the message in database
    const newEmoji = await prisma.messageReaction.create({
      data: {
        message:{
            connect: {
            messageId: messageId
           }
        },
        emoji: emoji,
        userId
        },
    })

    return NextResponse.json({ 
      success: true, 
    })

  } catch (error) {
    console.error("Error creating message:", error)
    
    // Handle duplicate messageId error
    if (error) {
      return NextResponse.json({ error: "Message with this ID already exists" }, { status: 409 })
    }

    return NextResponse.json({ error: "Failed to create message" }, { status: 500 })
  }
}
