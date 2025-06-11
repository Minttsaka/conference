import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"


export async function POST(request: Request) {
  try {

    const messageData = await request.json()

    // Validate required fields
    if (!messageData.id || !messageData.text || !messageData.senderId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create the message in database
    const message = await prisma.message.create({
      data: {
        messageId: messageData.id, // Use the client-generated ID as messageId
        text: messageData.text,
        userId: messageData.senderId,
        room: messageData.channelName, // You'll need to pass this or extract from somewhere
        roomId: messageData.channelName, // Assuming channelName is the roomId
        replyToId: messageData.replyToId || null,
        // Note: file handling would need additional logic if you're storing file info
      },
      include: {
        replyTo: {
          select: {
            id: true,
            text: true,
            userId: true,
          }
        }
      }
    })

    return NextResponse.json({ 
      success: true, 
      message: {
        id: message.id,
        messageId: message.messageId,
        text: message.text,
        userId: message.userId,
        createdAt: message.createdAt,
        replyTo: message.replyTo
      }
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
