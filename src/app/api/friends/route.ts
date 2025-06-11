import { NextResponse } from 'next/server';
import { User, UserRelation } from '@/db/models';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(){
  try{

    const session = await getServerSession(authOptions)
    if(!session){
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 })
    }

    const friends = await UserRelation.findAll({
        include: [
            {
                model: User,
                as: 'friend',
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            }
        ],
        where: { user_id: session.user.id }
    })

    const temp = friends.map(friend => friend.get({ plain: true }))

    const friendList = temp.map(({ friend, ...relation }) => {
        return {
            ...relation,
            ...friend
        }
    })

    return NextResponse.json(friendList)
  }catch(error){
    console.error('Failed to fetch friends:', error)
    return NextResponse.json({ error: 'Failed to fetch friends' }, { status: 500 })
  }
}
