import { RtmTokenBuilder, RtmRole } from 'agora-access-token'

export async function POST(req: Request) {
  try {
    const { userId } = await req.json()
    
    const appId = process.env.NEXT_PUBLIC_AGORA_APP_ID!
    const appCertificate = process.env.AGORA_APP_CERTIFICATE!
    
    // Token expires in 24 hours
    const expirationTimeInSeconds = 86400
    const currentTimestamp = Math.floor(Date.now() / 1000)
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds
    
    const token = RtmTokenBuilder.buildToken(
      appId,
      appCertificate,
      userId,
      RtmRole.Rtm_User,
      privilegeExpiredTs
    )
    
    return Response.json({ token })
  } catch (error) {
    return Response.json({ error: 'Failed to generate token' }, { status: 500 })
  }
}

