import ChatInterface from '@/components/futuristicChat/ChatInterface'
import React from 'react'


type User = {
  id: string
  name: string
  email?: string
  image?: string
  agoraUid?: number
}

export default function page() {


  const user ={

    id :'4544',
    name:"mint",
    email:"mint@mail.com",
  

  }
  return (

    <div>
      <ChatInterface user={user} />
    </div>
  )
}
