import { NextRequest, NextResponse } from 'next/server'
import { CategorizedEvent, Event, EventCategory, EventImage, EventParticipant, Organization, OrganizationMember, User } from '@/db/models'

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
){
  try{
    const { id } = params
    const event = await Event.findOne({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        include: [
            {
                model: EventImage,
                attributes: { exclude: ['createdAt', 'updatedAt','event_id'] }
            },
            {
                model: EventParticipant,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [
                    {
                        model: User,
                        attributes: ['img_url','name','id']
                    }
                ]
            },
            {
                model: CategorizedEvent,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [
                    {
                        model: EventCategory,
                        attributes: { exclude: ['createdAt', 'updatedAt'] }
                    }
                ]
            }
        ],
        where: {
            id: id
        }
    })

    const plainEvent = event?.get({ plain: true })
    const leaderUserId = plainEvent?.EventParticipants?.find(
        (p: any) => p.status === 'leader'
    )?.user_id

    let plainDetailedOrganization = null
    if(leaderUserId){
      const organization_details = await OrganizationMember.findOne({
        attributes: ['organization_id'],
        include: [
          {
            model: Organization,
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          }
        ],
        where: { user_id: leaderUserId }
      })
      plainDetailedOrganization = organization_details?.get({ plain: true }) ?? null
    }

    const other_events = await Event.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: EventImage,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        },
        {
          model: CategorizedEvent,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          include: [
            {
              model: EventCategory,
              attributes: { exclude: ['createdAt', 'updatedAt'] }
            }
          ]
        },
      ],
      limit: 3
    })

    const finalOtherEvents = other_events.map((event) => {
      const tempEvent = event.get({ plain: true })
      const temp = { ...tempEvent, photos: [{ img_url: tempEvent?.EventImages?.[0]?.img_url }] }
      delete temp?.EventImages
      return temp
    })

    const finalized = {
        ...plainEvent,
        organization: { ...(plainDetailedOrganization?.Organization) },
        event_images: plainEvent?.EventImages ?? [],
        event_participants: plainEvent?.EventParticipants?.map((participant: any) => ({
            ...participant.User,
            status: participant.status,
            is_verified: participant.is_verified
        })) ?? [],
        event_categories: plainEvent?.CategorizedEvents?.map((category: any) => category.EventCategory) ?? [],
        other_events: finalOtherEvents
    }

    delete finalized.EventImages;
    delete finalized.EventParticipants;
    delete finalized.CategorizedEvents;

    if(!finalized){
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    return NextResponse.json(finalized)
  }catch(err){
    console.error(err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
