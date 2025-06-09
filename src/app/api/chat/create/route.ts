import { NextResponse } from 'next/server';
import { Chat } from '@/db/models'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { sender_id, receiver_id, content } = await request.json();

    // Ensure valid data
    if (!sender_id || !receiver_id || !content.trim()) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get session (optional for authorization)
    const session = await getServerSession(authOptions);
    if (!session || session.user.id !== sender_id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Create new chat message
    const newMessage = await Chat.create({
      sender_id,
      receiver_id,
      chat: content,
      is_read: false,
    });

    return NextResponse.json(newMessage, { status: 201 }); // Return the created message
  } catch (error) {
    console.error('Error creating chat message:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
