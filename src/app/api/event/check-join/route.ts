import { NextRequest, NextResponse } from 'next/server';
import { EventParticipant } from '@/db/models'; // Adjust the import to your Sequelize model location

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const event_id = searchParams.get('event_id');
  const user_id = searchParams.get('user_id');

  if (!event_id || !user_id) {
    return NextResponse.json({ error: 'Missing event_id or user_id' }, { status: 400 });
  }

  try {
    const participant = await EventParticipant.findOne({
      where: {
        event_id: Number(event_id),
        user_id: Number(user_id),
      },
    });

    return NextResponse.json({ joined: !!participant });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
