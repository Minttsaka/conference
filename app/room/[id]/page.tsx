import RoomPage from '@/components/transcribe/RoomPage'
import React from 'react'

export default async function page({params}:{ params: Promise<{ id: string }>}) {

  const id = (await params).id

  return (
    <div>
      <RoomPage roomId ={ id } />
    </div>
  )
}
