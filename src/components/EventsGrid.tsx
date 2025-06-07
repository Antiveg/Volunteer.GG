import EventCardSmall from "./EventCardSmall"

const EventsGrid = ({ filteredEvents } : any) => {

    if(!filteredEvents || filteredEvents?.length <= 0){
        return null
    }

    return (
        <main className="w-128 flex grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-gray-100/50 p-4 rounded-lg">
            {filteredEvents && filteredEvents.length > 0 && filteredEvents.map((event : any) => (
                <EventCardSmall key={event.id} event={event}/>
            ))}
        </main>
    )
}

export default EventsGrid