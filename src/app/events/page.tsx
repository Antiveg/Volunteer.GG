"use client"
import React, { useEffect, useState } from 'react';
import { ErrorBox, EventCarousel, SearchBar, EventCardSmall, Footer, LoadingBox, /* EventFilterBox */ } from '@/components'
import { events_api_result } from '../../dummies/dummy_data_frontend'
import { EventAttributes, EventCategoryAttributes, EventImageAttributes } from '@/types'
import { useEvents } from '@/hooks/useEvents';
import EventsGrid from '@/components/EventsGrid';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface Event extends EventAttributes {
  photos: EventImageAttributes[],
  categories: EventCategoryAttributes[]
}

const Events = () => {

  const { data: session } = useSession()
  const router = useRouter()

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
      <main className="flex flex-col w-full h-auto min-h-screen px-16 pb-20 gap-4">
        <div className="text-2xl flex">
          <b>SEE AVAILABLE EVENTS</b>
          <Button variant="default" 
          onClick={() => router.push('/create-event')}
          disabled={!session}
          className={!session ? "bg-red-500 ml-auto" : "bg-blue-500 ml-auto"}>
            Create New Event
          </Button>
        </div>
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
            <EventsGrid filteredEvents={filteredEvents}/>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  )
}

export default Events