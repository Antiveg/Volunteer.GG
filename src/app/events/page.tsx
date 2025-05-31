"use client"
import React, { useEffect, useState } from 'react';
import { ErrorBox, EventCarousel, SearchBar, EventCardSmall, Footer, LoadingBox, /* EventFilterBox */ } from '@/components'
import { events_api_result } from '../../dummies/dummy_data_frontend'
import { EventAttributes, EventCategoryAttributes, EventImageAttributes } from '@/types'
import { useEvents } from '@/hooks/useEvents';

interface Event extends EventAttributes {
  photos: EventImageAttributes[],
  categories: EventCategoryAttributes[]
}

const Events = () => {

  const { data: events, isLoading, isError, error } = useEvents()
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [search, setSearch] = useState<string>('')
  
  useEffect(() => {
    if (events && events.length > 0) {
      setFilteredEvents(events)
    }
  }, [events])

  const handleSearch = (search : string) => {
    setSearch(search)
    const filteredEvents = events.filter((event : Event) => event.name.toLowerCase().includes(search.toLowerCase()))
    setFilteredEvents(filteredEvents)
  }

  if(isLoading){
    return <LoadingBox message="Fetching event list..."/>
  }

  if(isError){
    return <ErrorBox error={error as any}/>
  }

  return (
    <div className="bg-white">
      <main className="w-full h-auto min-h-screen px-16 pb-20">
        <section className="w-full mb-8 h-[350px]">
          <EventCarousel events={events} />
        </section>
        <section className="w-full flex flex-row gap-4">
          {/* <aside className="flex-none w-72">
            <EventSidebarFilter category={category} setCategories={setCategories} filters={filters} setFilters={setFilters}/>
          </aside> */}
          <div className="flex-grow flex flex-col gap-6">
            <SearchBar search={search} handleSearch={handleSearch}/>
            {(!events || events.length <= 0) &&
              <div className="flex min-h-72 flex justify-center items-center bg-gray-100 rounded-lg">No event existed yet...</div>
            }
            {(!filteredEvents || filteredEvents.length <= 0) &&
              <div className="flex min-h-72 flex justify-center items-center bg-gray-100 rounded-lg">No event meet the searched criteria...</div>
            }
            {filteredEvents.length > 0 &&
            <main className="w-128 flex grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-gray-100 p-4 rounded-lg">
              {filteredEvents && filteredEvents.length > 0 && filteredEvents.map(event => (
                <EventCardSmall key={event.id} event={event}/>
              ))}
            </main>
            }
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  )
}

export default Events