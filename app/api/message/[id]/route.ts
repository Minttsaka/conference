import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { prisma } from "@/lib/db"

export async function GET(req: NextRequest) {
  try {

    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    const user = await getSession()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }


    if (!id) {
      return NextResponse.json({ error: "Room ID is required" }, { status: 400 })
    }

    const messages = await prisma.message.findMany({
      where: {
        id,
      },
      include: {
        reactions: true,
        replyTo: true,
        file: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    })

    return NextResponse.json({ messages }, { status: 200 })
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getSession()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id, text, replyToId, fileUrl, fileName } = await req.json()

    if (!id || !text) {
      return NextResponse.json({ error: "Room ID and text are required" }, { status: 400 })
    }

    // Create message
    const message = await prisma.message.create({
      data: {
        text,
        userId:user.userId,
        roomId:id,
        ...(replyToId && {
          replyTo: {
            connect: {
              id: replyToId,
            },
          },
        }),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            agoraUid: true,
          },
        },
        replyTo: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    })

    // If file is provided, create file record
    if (fileUrl && fileName) {
      await prisma.file.create({
        data: {
          name: fileName,
          url: fileUrl,
          userId:user.userId,
          message: {
            connect: {
              id: message.id,
            },
          },
        },
      })

      // Fetch the message with the file
      const messageWithFile = await prisma.message.findUnique({
        where: {
          id: message.id,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
              agoraUid: true,
            },
          },
          replyTo: {
            include: {
              user:,
            },
          },
          file: true,
        },
      })

      return NextResponse.json({ message: messageWithFile }, { status: 201 })
    }

    return NextResponse.json({ message }, { status: 201 })
  } catch (error) {
    console.error("Error creating message:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
