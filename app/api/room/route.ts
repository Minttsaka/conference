import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

// In a real application, you would use a database to store room information
const rooms = new Map<
  string,
  {
    id: string
    name: string
    createdAt: Date
    participants: { id: string; name: string }[]
  }
>()

export async function POST(request: NextRequest) {
  try {
    const { name, creatorName } = await request.json()

    if (!name || !creatorName) {
      return NextResponse.json({ error: "Room name and creator name are required" }, { status: 400 })
    }

    // Generate a unique room ID
    const roomId = crypto.randomBytes(4).toString("hex")

    // Create a new room
    const newRoom = {
      id: roomId,
      name,
      createdAt: new Date(),
      participants: [{ id: crypto.randomUUID(), name: creatorName }],
    }

    // Store the room
    rooms.set(roomId, newRoom)

    return NextResponse.json({ roomId, room: newRoom })
  } catch (error) {
    console.error("Error creating room:", error)
    return NextResponse.json({ error: "Failed to create room" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const roomId = url.searchParams.get("roomId")

    if (!roomId) {
      // Return all rooms if no roomId is provided
      return NextResponse.json({
        rooms: Array.from(rooms.values()),
      })
    }

    // Get a specific room
    const room = rooms.get(roomId)

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 })
    }

    return NextResponse.json({ room })
  } catch (error) {
    console.error("Error getting room:", error)
    return NextResponse.json({ error: "Failed to get room" }, { status: 500 })
  }
}

