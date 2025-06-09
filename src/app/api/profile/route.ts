import { NextRequest, NextResponse } from 'next/server';
import { Achievement, Event, Item, Organization, OrganizationMember, User, UserAchievement, UserCertificate, UserHistory, UserPurchase, UserRelation } from '@/db/models';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(_req: NextRequest) {

    const session = await getServerSession(authOptions);
    if (!session) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    try {

        const uid = session.user.id
        // const uid = 1

        const user = await User.findOne({
            where: { id: uid},
            include: [
                {
                    model: OrganizationMember,
                    attributes: ['organization_id'],
                    include: [
                        {
                            model: Organization,
                            attributes: ['logo_url','name','id']
                        }
                    ]
                }
            ]
        })

        const history = await UserHistory.findAll({
            where: { user_id: uid },
            include: [
                {
                    model: Event
                },
                {
                    model: UserPurchase,
                    include: [
                        {
                            model: Item,
                            attributes: ['name','type','description']
                        }
                    ]
                }
            ]
        })

        const achievements = await Achievement.findAll({
            include: [
                {
                    model: UserAchievement,
                    where: { user_id: uid },
                    attributes: ['user_id'],
                    required: false,
                }
            ]
        });
        const achievements_withstatus = achievements.map(achievement => ({
            ...achievement.toJSON(),
            is_achieved: (achievement as any)?.UserAchievements?.length > 0,
            UserAchievements: undefined
        }))

        const certificates = await UserCertificate.findAll({
            attributes: ['certificate_url','id','createdAt'],
            where: {user_id: uid}
        })

        const friends = await UserRelation.findAll({
            include: [
                {
                    model: User,
                    as: 'friend', // Ensure you're using the correct alias
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }
            ],
            where: { user_id: uid }
        });

        // Convert to plain objects
        const temp = friends.map(friend => friend.get({ plain: true }));

        // Flatten the data by destructuring friend and relation
        const friendList = temp.map(({ friend, ...relation }) => {
            return {
                ...relation, // Spread the relation data (UserRelation attributes)
                ...friend // Spread the friend's user data
            };
        });

        const combined = {
            user,
            history,
            friends: friendList,
            achievements: achievements_withstatus,
            certificates
        }

        return NextResponse.json(combined);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { message: 'An error occurred while fetching users' },
            { status: 500 }
        )
    }
}
