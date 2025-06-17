import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"


export async function POST(request: Request) {
  try {

    const messageData = await request.json()

    if (!messageData.id || !messageData.text || !messageData.senderId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const message = await prisma.message.create({
      data: {
        messageId: messageData.id, 
        text: messageData.text,
        userId: messageData.senderId,
        room: messageData.channelName,
        roomId: messageData.channelName, 
        replyToId: messageData.replyToId || null,
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

    if(message.replyToId) {
      await prisma.message.update({
        where: { messageId: message.replyToId },
        data: {
          replyTo: {
            connect: {
              id: message.id
            }
          }
        }
      })
    }

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
