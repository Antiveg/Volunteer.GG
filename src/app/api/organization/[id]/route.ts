import { NextRequest, NextResponse } from 'next/server'
import { CategorizedEvent, Event, EventCategory, EventImage, Organization, OrganizationImage, OrganizationMember, User } from '@/db/models'

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
){
  try{
    const organization = await Organization.findByPk(params?.id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: OrganizationImage,
          attributes: { exclude: ['createdAt', 'updatedAt','organization_id'] }
        },
        {
          model: OrganizationMember,
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'organization_id', 'user_id'],
          },
          include: [
            {
              model: User,
              attributes: ['name','id','city','total_points','bio','img_url']
            }
          ]
        }
      ]
    })

    const plainOrganization = organization?.get({ plain: true })

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
      ],
      where: { organization_id: plainOrganization?.id }
    })

    const flattenedEvents = events.map(event => {
      const eventData = event.toJSON()
      const categories = eventData.CategorizedEvents?.map((categorizedEvent : any) =>
        categorizedEvent.EventCategory
      ).filter(Boolean) || []
      const photos = eventData.EventImages || []
  
      const organization_name = eventData.EventParticipants?.[0]?.OrganizationMembers?.Organization?.name || null
  
      return {
        ...eventData,
        photos,
        categories,
        organization_name,
        EventImages: undefined,
        CategorizedEvents: undefined,
        EventParticipants: undefined
      }
    })

    plainOrganization.OrganizationMembers = plainOrganization.OrganizationMembers.map((member : any) => ({
      ...member,
      ...member.User,
      User: undefined
    }))

    plainOrganization.events = flattenedEvents

    plainOrganization.members = plainOrganization.OrganizationMembers
    delete plainOrganization.OrganizationMembers

    plainOrganization.organization_images = plainOrganization.OrganizationImages
    delete plainOrganization.OrganizationImages

    if(!plainOrganization){
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 })
    }

    return NextResponse.json(plainOrganization)
  }catch (error) {
    console.error('GET organization error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
