import { NextResponse } from 'next/server';
import { Chat } from '@/db/models'
import { Op } from 'sequelize';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: { receipient_id: string } }
) {

  const { receipient_id } = await params

  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
  }

  const senderId = parseInt(session.user.id);
  const receipientId = parseInt(receipient_id);

  console.log(senderId)
  console.log(receipientId)

  try {
    const messages = await Chat.findAll({
        where: {
            [Op.or]: [
                { sender_id: senderId, receiver_id: receipientId },
                { sender_id: receipientId, receiver_id: senderId },
            ]
        },
        order: [['createdAt', 'ASC']],
    });

    console.log(messages)

    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load chat messages' }, { status: 500 });
  }
}
