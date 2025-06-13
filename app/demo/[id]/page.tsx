import { VideoRoom } from '@/components/chat/VideoRoom'
// import { getSession, SessionPayload } from '@/lib/session'
import React from 'react'

export default async function page({params}:{ params: Promise<{ id: string }>}) {

  // const session = await getSession()

  return (
    <div>
     <VideoRoom 
     meetingId={(await params).id} 
    //  user = {session as SessionPayload} 
     />
    </div>
  )
}
