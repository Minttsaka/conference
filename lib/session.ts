import "server-only"
import { jwtVerify } from "jose"
import { cookies } from "next/headers"

// This interface defines what's stored in the session
// Must match the structure from the main app
export interface SessionPayload {
  userId: string
  name: string
  email: string
  expiresAt: number
}

// Secret key for JWT verification - must be the same as in the main app
const secretKey = process.env.NEXT_PUBLIC_SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

// Function to decrypt the JWT session
export async function decrypt(session: string | undefined = "") {
  if (!session) {
    console.log("No session provided")
    return null
  }

  if (!secretKey) {
    console.error("SESSION_SECRET is not defined")
    return null
  }

  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"], // Make sure this matches the algorithm in the main app
    })

    console.log("Session decrypted successfully:", payload)
    return payload as SessionPayload
  } catch (error) {
    // More detailed error logging
    if (error instanceof Error) {
      console.error("Failed to verify session:", error.message)

      // Log the first few characters of the session for debugging
      // (don't log the full token for security reasons)
      if (session.length > 10) {
        console.log("Session token starts with:", session.substring(0, 10) + "...")
      }
    }
    return null
  }
}

// Function to get the current session
export async function getSession() {
  const cookieStore = await cookies()
  const session = cookieStore.get("session")?.value
  if (!session) return null

  const payload = await decrypt(session)
  if (!payload) return null

  // Check if session is expired
  if (payload.expiresAt < Date.now()) {
    return null
  }

  return payload
}

