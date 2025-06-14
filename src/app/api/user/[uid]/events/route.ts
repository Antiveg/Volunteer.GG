import { NextResponse, NextRequest } from 'next/server';
import { CategorizedEvent, Event, EventCategory, EventImage, EventParticipant, Organization } from '@/db/models';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<Record<string, string>> }
){
  const { uid } = await params
  const events = await Event.findAll({
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
      {
        model: Organization,
        attributes: ['name']
      },
      {
        model: EventParticipant,
        where: {
          user_id: uid
        },
      },
    ]
  })

  const flattenedEvents = events.map(event => {
    const eventData = event.toJSON()
    const categories = eventData.CategorizedEvents?.map((categorizedEvent : any) =>
      categorizedEvent.EventCategory
    ).filter(Boolean) || [];
    const photos = eventData.EventImages || []

    const organization_name = eventData.EventParticipants?.[0]?.organizationMember?.Organization?.name || null

    return {
      ...eventData,
      photos,
      categories,
      organization_name,
      EventImages: undefined,
      CategorizedEvents: undefined
    }
  })

  return NextResponse.json(flattenedEvents)
}
