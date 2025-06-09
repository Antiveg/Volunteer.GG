import { NextRequest, NextResponse } from 'next/server';
import { Event, EventParticipant, User } from '@/db/models';

export async function POST(req: NextRequest) {
  try {
    const { event_id, points } = await req.json();

    if (!event_id) {
      return NextResponse.json({ error: 'Missing event_id' }, { status: 400 });
    }

    // Get all verified participants
    const verifiedParticipants = await EventParticipant.findAll({
      where: {
        event_id,
        is_verified: 'verified',
      },
    });

    for (const participant of verifiedParticipants) {
        const { user_id } = participant.get({ plain: true });
        const user = await User.findByPk(user_id);
        if (user) {
            await user.increment('total_points', { by: points });
            await user.increment('usable_points', { by: points });
            await user.increment('monthly_points', { by: points });
        }
    }

    // Optional: mark event as finalized (e.g., update status)
    await Event.update({ status: 'Finalized' }, { where: { id: event_id } });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to finalize event' }, { status: 500 });
  }
}
