import { NextRequest, NextResponse } from 'next/server'
import { Event, EventParticipant, User } from '@/db/models'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try{
    const eventId = params.id

    const info = await Event.findOne({
      where: { id: eventId },
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
