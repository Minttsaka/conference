import { getAgoraToken } from "@/lib/initAgoraClient"
import { SessionPayload } from "@/lib/session"
import { getOrCreateUserId } from "@/lib/userGn"
import AgoraRTM from "agora-rtm-sdk"

const { RTM } = AgoraRTM

// Replace with your actual Agora App ID
const AGORA_APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID! || ""




export async function initializeAgoraRTM( user: SessionPayload, meetingId: string) {
  try {

    const userId = getOrCreateUserId(user)

    const rtm = new RTM(AGORA_APP_ID, userId)

    const token = await getAgoraToken(userId)

    try {
      await rtm.login({ token })
      await rtm.subscribe(meetingId)

    } catch (status) {
      console.error("Failed to login to RTM:", status)
      throw status
    }

    return { rtm, channelName: meetingId }
  } catch (error) {
    console.error("Failed to initialize Agora RTM:", error)
    throw error
  }
}

export async function publishMessage( rtm: any, channelName: string, message: any) {
  try {

    const messageString = JSON.stringify(message)

    await rtm.publish(channelName, messageString)

    return true
  } catch (status) {
    console.error("Failed to publish message:", status)
    throw status
  }
}

