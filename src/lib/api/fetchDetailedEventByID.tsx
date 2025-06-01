import { EventAttributes, EventCategoryAttributes, OrganizationAttributes } from '@/types';

interface DetailedEventProps extends EventAttributes {
    event_images: {
        img_url: string
        id?: number
    }[]
    event_categories: EventCategoryAttributes[]
    event_participants: {
        img_url: string
        name: string
        status: string
        is_verified: string | null
        id: number
    }[]
    organization: OrganizationAttributes
    other_events: EventAttributes[]
}

export async function fetchEventById(id: string): Promise<DetailedEventProps> {
    const res = await fetch(`/api/event/${id}`);

    if (!res.ok) {
        const errorBody = await res.json()
        const error = new Error(errorBody.message || 'Error occurred') as any
        error.status = res.status
        throw error
    }

    return res.json();
}