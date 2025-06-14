import { NextRequest, NextResponse } from 'next/server'
import { Event, EventParticipant, User } from '@/db/models'

export async function GET(_req: NextRequest, { params }: { params: Promise<Record<string, string>> }) {
  try{
    const { id } = await params

    const info = await Event.findOne({
      where: { id: id },
      include: [
        {
          model: EventParticipant,
          include: [{ model: User }],
        },
        { model: User },
      ],
    })

    return NextResponse.json(info?.get({ plain: true }))
  }catch(err){
    console.error(err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
