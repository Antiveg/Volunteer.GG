"use client"
import { LoadingBox } from '@/components'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function Home() {
  const { status } = useSession()

  if(status === "loading"){
    return <LoadingBox message="Checking current logged in user..."/>
  }
  else if(status === "unauthenticated"){
    redirect('/events')
  }
  else if(status === "authenticated"){
    redirect('/dashboard')
  }
}
