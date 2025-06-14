import { NextResponse } from 'next/server';
import { Chat } from '@/db/models'
import { Op } from 'sequelize';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: Promise<Record<string, string>> }
) {

  const { receipient_id } = await params

  const session = await getServerSession(authOptions);
  if(!session){
    return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
  }

  const senderId = parseInt(session.user.id)
  const receipientId = parseInt(receipient_id)

  try{
    const messages = await Chat.findAll({
        where: {
            [Op.or]: [
                { sender_id: senderId, receiver_id: receipientId },
                { sender_id: receipientId, receiver_id: senderId },
            ]
        },
        order: [['createdAt', 'ASC']],
    })

    return NextResponse.json(messages);
  }catch (error : any) {
    console.error('GET organization error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
