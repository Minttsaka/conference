import { VideoRoom } from '@/components/chat/demo-file'
import { user } from '@/lib/meeting'
import React from 'react'


export default async function page({
    params
}:{ 
    params: Promise<{ id: string }>
}) {

  return (
    <div>
      <VideoRoom 
      meetingId={(await params).id} 
        user = {user}  />
    </div>
  )
}
