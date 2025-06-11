// Route: PATCH /api/event-participant/verify
import { NextRequest, NextResponse } from 'next/server';
import { EventParticipant } from '@/db/models';

export async function PATCH(req: NextRequest){
  try{
    const { event_id, user_id, is_verified } = await req.json()

    await EventParticipant.update(
      { is_verified },
      { where: { event_id, user_id } }
    )

    return NextResponse.json({ success: true })
  }catch(err){
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}
