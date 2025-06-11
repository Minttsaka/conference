import { getAgoraToken } from "@/lib/initAgoraClient"
import { SessionPayload } from "@/lib/session"
import { getOrCreateUserId } from "@/lib/userGn"
import AgoraRTM from "agora-rtm-sdk"

const { RTM } = AgoraRTM

// Replace with your actual Agora App ID
const AGORA_APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID! || ""




export async function initializeAgoraRTM(user: SessionPayload, meetingId: string) {
  try {
    const userId = getOrCreateUserId(user)

    // Create an RTM instance with the new API
    const rtm = new RTM(AGORA_APP_ID, userId)
    console.log("RTM instance created successfully")

    // Get token (in production, fetch from your server)
    const token = await getAgoraToken(userId)

    // Login to RTM
    try {
      await rtm.login({ token })
      console.log("Logged in to RTM successfully")
    } catch (status) {
      console.error("Failed to login to RTM:", status)
      throw status
    }

    // Subscribe to the channel
    try {
      await rtm.subscribe(meetingId)
      console.log("Successfully subscribed to channel:", meetingId)
    } catch (status) {
      console.error("Failed to subscribe to channel:", status)
      throw status
    }

    return { rtm, channelName: meetingId }
  } catch (error) {
    console.error("Failed to initialize Agora RTM:", error)
    throw error
  }
}

// Helper function to publish a message to a channel
export async function publishMessage(rtm: any, channelName: string, message: any) {
  try {
    // Convert message object to string
    const messageString = JSON.stringify(message)

    // Publish the message
    await rtm.publish(channelName, messageString)
    console.log("message pubished")
    return true
  } catch (status) {
    console.error("Failed to publish message:", status)
    throw status
  }
}

