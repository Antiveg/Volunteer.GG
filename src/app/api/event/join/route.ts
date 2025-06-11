import { NextRequest, NextResponse } from 'next/server';
import { EventParticipant } from '@/db/models'; // Adjust import to your Sequelize models

export async function POST(request: NextRequest) {
  try {
    const { event_id, user_id } = await request.json();

    if (!event_id || !user_id) {
      return NextResponse.json({ error: 'Missing event_id or user_id' }, { status: 400 });
    }

    // Check if already joined
    const existing = await EventParticipant.findOne({
      where: { event_id: Number(event_id), user_id: Number(user_id) },
    });

    if (existing) {
      return NextResponse.json({ error: 'User already joined the event' }, { status: 400 });
    }

    const newParticipant = await EventParticipant.create({
      event_id: Number(event_id),
      user_id: Number(user_id),
      status: 'participant',
      is_verified: 'pending',
    });

    return NextResponse.json({ success: true, participant: newParticipant });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
