import React from 'react';
import { img_temp } from '../dummies/dummy_data_frontend'
import { EventAttributes, EventCategoryAttributes, EventImageAttributes } from '@/types'
import { redirect } from 'next/navigation'


interface Props {
  event: EventAttributes & {
    photos?: EventImageAttributes[]
    categories?: EventCategoryAttributes[]
    organization_name?: string
  }
  message?: string | null
}

const EventCardBig = ({ event, message } : Props) => {
  if(message){
    return (
      <div className="w-[700px] h-full bg-gray-200 border border-gray-200 rounded-lg shadow-lg flex overflow-hidden flex items-center pl-10">
        <b className="text-2xl text-gray-500">{message}</b>
      </div>
    )
  }

  if (!event) {
    return null
  }

  const {
    id, name, base_points, photos,
    categories, description, end_datetime,
    start_datetime, location, final_points,
    organization_name
  } = event

  const eventDetailUrl = `/event/${id}`

  return (
    <div className="w-[700px] h-full bg-white border border-gray-200 rounded-lg shadow-lg flex overflow-hidden">
      <div className="relative w-2/5 h-full">
        <img src={photos ? photos[0].img_url : img_temp} alt="no image" className="w-full h-full object-cover" />
        {(base_points || final_points) && (
          <div className="absolute top-4 right-4 bg-black text-white py-1 px-2 rounded-full text-xs font-bold flex items-center z-10">
            <span className="mr-2">👁️</span> {final_points ? final_points : base_points}
          </div>
        )}
        {(base_points && final_points) && (
          <div className="absolute bottom-4 left-4 bg-orange-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-md z-10">
            {Math.round(final_points / base_points).toFixed(1)}
          </div>
        )}
      </div>

      <div className="w-3/5 h-full p-4 flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{name}</h3>
        <div className="mb-2 flex flex-wrap gap-2">
          {categories && categories.map((category, index) => (
            <span
              key={index}
              className='py-1 px-3 rounded-full text-xs font-medium text-black'
              style={{ backgroundColor: category.color }}
            >
              {category.category}
            </span>
          ))}
        </div>
        <div className="text-sm text-gray-600 mb-4">
          <div className="flex items-center mb-1">
            <span className="mr-2">🕒</span> {start_datetime}
          </div>
          <div className="flex items-center mb-1">
            <span className="mr-2">📍</span> {location}
          </div>
          <div className="flex items-center">
            <span className="mr-2">👤</span> {organization_name}
          </div>
        </div>
        <div className="text-sm text-gray-700 mb-4">
          <strong>Event Description:</strong>
          <br />
          <p className="line-clamp-4">{description}{description}{description}</p>
        </div>
        <div className="flex gap-3 justify-end">
          <button
            className="px-6 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg font-semibold hover:bg-gray-200"
            onClick={() => redirect(`/event-detail/${id}`)}
          >
            More Details
          </button>
        </div>
      </div>
    </div>
  )
}

export default EventCardBig