import { NextResponse } from 'next/server'
import { User } from '@/db/models'

export async function GET() {

  const users = await User.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    },
  })

  return NextResponse.json(users)
}