import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(req: NextRequest) {
  try {

    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json({ error: "Room ID is required" }, { status: 400 })
    }

    const messages = await prisma.message.findMany({
      where: {
        roomId: id,
      },
      include: {
        replyTo: {
          select: {
            id: true,
            messageId: true,
            text: true,
            userId: true,
          }
        },
        reactions: {
          select: {
            id: true,
            emoji: true,
            userId: true,
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    const formattedMessages = messages.map(msg => ({
      id: msg.messageId,
      text: msg.text,
      sender: msg.userId,
      senderId: msg.userId,
      timestamp: msg.createdAt,
      isCurrentUser: true,
      reactions: msg.reactions.map(reaction => ({
        emoji: reaction.emoji,
        userId: reaction.userId
      })),
      replyTo: msg.replyTo?.text,
      replyToId: msg.replyTo?.messageId,
      replyToSender: msg.replyTo?.userId,
      roomId: msg.roomId,
    }))

    return NextResponse.json({ messages:formattedMessages }, { status: 200 })
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}