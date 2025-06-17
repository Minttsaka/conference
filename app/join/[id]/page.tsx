import JoinCall from '@/components/JoinCall'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function page({
  params
}: {
  params:  Promise<{ id: string }>
}) {

  const session = await getSession()
  if (!session) {
   
    //redirect(`http://localhost:3000/i/auth/${(await params).id}`)
  }

  return (
    <div>
      <JoinCall 
      id={(await params).id} 
      user = {session} 
      />
    </div>
  )
}
