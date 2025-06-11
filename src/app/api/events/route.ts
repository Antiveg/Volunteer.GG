import { NextResponse } from 'next/server'
import { Event, EventImage, CategorizedEvent, EventCategory, Organization } from '@/db/models'
import { EventCategoryAttributes } from '@/types'

interface Props {
  event_id: number
  category_id: number
  EventCategory: EventCategoryAttributes
}

export async function GET(){

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
      }
    ]
  })

  const flattenedEvents = events.map(event => {
    const eventData = event.toJSON()
    const categories = eventData.CategorizedEvents?.map((categorizedEvent : Props) =>
      categorizedEvent.EventCategory
    ).filter(Boolean) || []
    const photos = eventData.EventImages || []

    const organization_name = eventData?.Organization?.name || null

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