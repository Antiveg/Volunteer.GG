"use client"
import React from 'react'
import Link from 'next/link'
import { img_temp } from '../dummies/dummy_data_frontend'
import { EventAttributes, EventCategoryAttributes, EventImageAttributes } from '@/types'

interface Props {
  event: EventAttributes & {
    photos?: EventImageAttributes[]
    categories?: EventCategoryAttributes[]
    friend_count?: number
    organization_name?: string
  }
}

const EventCardSmall = ({ event } : Props) => {
  if (!event) {
    return <div></div>
  }

  const {
    id, name, photos, categories, start_datetime, 
    location, final_points, friend_count
  } = event

  const event_details_url = `/event-detail/${id}`

  return (
    <Link href={event_details_url} className="block no-underline text-inherit rounded-xl transform transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg w-full max-w-80">
      <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col relative w-full h-full font-sans">
        {/* Image container */}
        <div className="relative w-full h-[160px] flex-shrink-0">
          <img
            src={photos && photos.length > 0 ? photos[0].img_url : img_temp}
            alt={name}
            className="w-full h-full object-cover block"
          />
          {/* Points badge */}
          <div className="absolute bottom-2.5 right-2.5 bg-black bg-opacity-70 text-white px-2.5 py-1.5 rounded-full flex items-center text-sm font-medium">
            <span className="mr-1 text-lg">♦️</span>
            {final_points ?? 0}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 flex flex-col flex-grow overflow-hidden box-border">
          {/* Tags container */}
          <div className="flex flex-wrap gap-2 mb-2 shrink-0">
            {categories && categories.map((category, index) => (
              <span
                key={index}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold`}
                style={{ backgroundColor : category.color }}
              >
                {category.category}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3
            className="text-lg font-bold text-gray-900 mb-2 line-clamp-1"
            title={name}
          >
            {name}
          </h3>

          <div className="flex items-center mb-2 text-gray-600 text-sm">
            <div className="w-7 h-7 bg-yellow-50 rounded-lg flex items-center justify-center mr-3 text-gray-800 text-base">
              🕒
            </div>
            <span className="line-clamp-1">{start_datetime}</span>
          </div>
          {/* Location */}
          <div className="flex items-center text-gray-600 text-sm">
            <div className="w-7 h-7 bg-yellow-50 rounded-lg flex items-center justify-center mr-3 text-gray-800 text-base">
              📍
            </div>
            <span className="line-clamp-1">{location || 'No location'}</span>
          </div>
        </div>

        {/* Friends joined badge */}
        {friend_count !== undefined && friend_count > 0 && (
          <div className="bg-yellow-200 text-yellow-900 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm z-10 line-clamp-1">
            {friend_count} Friend{friend_count !== 1 ? 's' : ''} Joined
          </div>
        )}
      </div>
    </Link>
  )
}

export default EventCardSmall;