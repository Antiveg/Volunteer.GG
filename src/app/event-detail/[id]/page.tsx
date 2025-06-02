"use client";

import { useState } from "react";
import { useParams } from 'next/navigation';
import { ErrorBox, Footer, LoadingBox } from "@/components";
import { useDetailedEventByID } from "@/hooks/useDetailedEventByID";
import { ImageCarousel, EventCardSmall } from "@/components";
import { events_api_result } from "@/dummies/dummy_data_frontend";

const EventDetailPage = () => {

  const [isJoined, setIsJoined] = useState(false);
  const params = useParams(); // returns { id: string }
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const { 
    data: event, 
    isLoading, 
    isError, 
    error 
  } = useDetailedEventByID(id)

  const renderStars = (rating : number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<span key={i} className={i <= rating ? "text-yellow-400" : "text-gray-300"}>★</span>);
    }
    return stars;
  };

  const handleJoinClick = () => {
    setIsJoined(true);
  };

  if(isLoading){
    return <LoadingBox message={`Fetching event ${id} details...`}/>
  }

  if(isError){
    return <ErrorBox error={error as any}/>
  }

  return (
    <div className="flex flex-col w-full h-auto gap-4">
      <div className="flex flex-col font-sans text-gray-800 bg-gray-100 gap-4 mx-8 mb-10 p-4 rounded-lg lg:flex-row h-auto">
        {/* Main content */}
        <div className="flex-2 flex flex-col gap-5 lg:w-2/3 w-full">
          {/* Header Image */}
          <ImageCarousel images={event?.event_images || []}/>

          {/* Company Info Card */}
          <div className="bg-white p-5 rounded-lg shadow flex gap-5 items-start relative">
            <div className="flex-shrink-0">
              <img
                src={event?.organization?.logo_url ? event.organization.logo_url : 'assets/landscape-placeholder.svg'}
                alt="Company Logo"
                className="w-20 h-20 rounded-lg object-cover border border-gray-200"
              />
            </div>
            <div className="flex-grow">
              <h2 className="text-2xl text-blue-900 mb-2"><b>{event?.organization?.name}</b></h2>
              <div className="flex flex-wrap gap-4 text-gray-600 text-sm mb-2">
                <div className="flex items-center gap-1">
                  <div className="flex">{renderStars(event?.organization?.avg_rating ?? 0)}</div> {event?.organization?.avg_rating ?? 0}/5.0
                </div>
                <div>
                  Event Hosted : <strong>5</strong>
                </div>
                <div>
                  General Credibility : 
                  <span className={event?.organization?.credibility === "Trusted" ? "text-green-600" : ""}>
                    <b> {event?.organization?.credibility}</b>
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm mt-2">
                <span>Current Event Hosts:</span>
                <div className="flex items-center">
                  {event?.event_participants && event?.event_participants.map((participant : any, index) => (
                    <img
                      key={index}
                      src={participant?.img_url ? participant.img_url : 'assets/userIcon'}
                      alt={`Host ${index + 1}`}
                      className={`h-8 w-8 rounded-full border-2 border-white object-cover ${
                        index !== 0 ? "-ml-2" : ""
                      }`}
                    />
                  ))}
                  {(event?.event_participants?.length ?? 0) > 5 && <span className="text-xs text-gray-500 ml-2">and more</span>}
                </div>
              </div>
            </div>
            <a
              href="/events"
              className="absolute bottom-4 right-5 text-sm text-blue-600 hover:underline"
            >
              See more about Us ...
            </a>
          </div>

          {/* Descriptions About the Event */}
          <div className="bg-white p-5 rounded-lg shadow">
            <h3 className="text-xl text-blue-900 mb-3"><b>Descriptions About the Event</b></h3>
            <p className="text-gray-600 leading-relaxed text-justify">
              {event?.description}
            </p>
          </div>

          {/* Other Event Section */}
          <div className="bg-white p-5 rounded-lg shadow">
            <h3 className="text-xl text-blue-900 mb-4"><b>Other Events...</b></h3>
            <div className="flex flex-row w-full h-auto gap-4 overflow-x-scroll p-2">
                  {event?.other_events && event?.other_events.map((event, index) => (
                    <EventCardSmall key={index} event={event}/>
                  ))}
            </div>
            <a
              href="#seeMoreReviews"
              className="block text-right mt-2 text-sm text-blue-600 hover:underline"
            >
              See more events ...
            </a>
          </div>
        </div>

        {/* Sidebar */}
        <div className=" relative flex-1">
          <div className="w-full p-5 rounded-lg shadow max-h-fit flex flex-col gap-3 bg-white lg:sticky lg:top-24">
            <h1 className="text-xl text-blue-900 mb-1"><b>{event?.name}</b></h1>

            <div className="flex gap-2 mb-2">
              {event?.event_categories && event.event_categories.map((category) => (
                <span key={category.id}
                className="px-3 py-1 rounded-full text-xs font-medium text-black" 
                style={{ backgroundColor: category.color }}>
                  {category.category}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 text-gray-700 text-sm">
              <p className="flex gap-2"><span>📅</span>{event?.start_datetime} s.d. {event?.end_datetime}</p>
            </div>
            <div className="flex items-center gap-2 text-gray-700 text-sm">
              <p className="flex gap-2"><span>📍</span>{event?.location}</p>
            </div>
            <div className="flex items-center gap-2 text-gray-700 text-sm">
              <p className="flex gap-2"><span>🏢</span>{event?.organization?.name}</p>
            </div>
            <div className="flex items-center gap-2 text-gray-700 text-sm">
              <p className="flex gap-2"><span>⭐</span>+{event?.final_points} points</p>
            </div>
            <div className="flex items-center gap-2 text-gray-700 text-sm">
              <p className="flex gap-2"><span>👥</span>Current Volunteer(s) : {event?.event_participants?.length}</p>
            </div>

            <div className="mt-3 mb-4">
              <h4 className="text-base font-semibold text-gray-900 mb-1">
                Short Description :
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
                {event?.description}
              </p>
            </div>

            {isJoined ? (
              <button
                disabled
                className="w-full py-3 bg-amber-400 text-gray-900 font-bold rounded-md cursor-not-allowed"
              >
                Registration confirmed. Please arrive on time.
              </button>
            ) : (
              <button
                onClick={handleJoinClick}
                className="w-full py-3 bg-amber-400 text-gray-900 font-bold rounded-md hover:bg-amber-500 transition"
              >
                JOIN HERE
              </button>
            )}

            <button className="w-full py-3 bg-gray-300 text-gray-900 font-bold rounded-md hover:bg-gray-400 transition">
              Contact Organization
            </button>
            <button className="w-full py-3 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition">
              Report This Event
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default EventDetailPage