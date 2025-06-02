"use client";

import { useState } from "react";
import { useParams } from 'next/navigation';
import { ErrorBox, Footer, FriendList, LoadingBox } from "@/components";
import { useDetailedOrganizationByID } from "@/hooks/useDetailedOrganizationByID";
import { ImageCarousel, EventCardSmall } from "@/components";
import { events_api_result } from "@/dummies/dummy_data_frontend";

const OrganizationDetailPage = () => {

  const [isJoined, setIsJoined] = useState(false);
  const params = useParams(); // returns { id: string }
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const { 
    data: organization, 
    isLoading, 
    isError, 
    error 
  } = useDetailedOrganizationByID(id as any)

  const renderStars = (rating : number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(<span key={i} className={i <= rating ? "text-yellow-400" : "text-gray-300"}>★</span>);
    }
    return stars;
  };

  const handleJoinClick = () => {
    setIsJoined(true);
  }

  if(isLoading){
    return <LoadingBox message={`Fetching organization (${id}) details...`}/>
  }

  if(isError){
    return <ErrorBox error={error as any}/>
  }

  return (
    <div className="flex flex-col w-full h-auto gap-4">
      <div className="flex flex-col font-sans text-gray-800 bg-gray-100 gap-4 mx-8 p-4 rounded-lg lg:flex-row h-auto">

        <div className="flex-2 flex flex-col gap-5 lg:w-2/3 w-full">

          <ImageCarousel images={organization?.organization_images || []}/>

          <div className="bg-white p-5 rounded-lg shadow flex gap-5 items-start relative">
            <div className="flex-shrink-0">
              <img
                src={organization?.logo_url ? organization.logo_url : 'https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png'}
                alt="Company Logo"
                className="w-20 h-20 rounded-lg object-cover border border-gray-200"
              />
            </div>
            <div className="flex-grow">
              <h2 className="text-2xl text-blue-900 mb-2"><b>{organization?.name}</b></h2>
              <div className="flex flex-wrap gap-4 text-gray-600 text-sm mb-2">
                <div className="flex items-center gap-1">
                  <div className="flex">{renderStars(organization?.avg_rating ?? 0)}</div> {organization?.avg_rating ?? 0}/5.0
                </div>
                <div>
                  Event Count : <strong>5</strong>
                </div>
                <div>
                  General Credibility : 
                  <span className={organization?.credibility === "Trusted" ? "text-green-600" : ""}>
                    <b> {organization?.credibility}</b>
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm mt-2">
                <span>Members :</span>
                <div className="flex items-center">
                  {organization?.members && organization?.members?.map((participant : any, index : number) => (
                    <img
                      key={index}
                      src={participant?.img_url ? participant.img_url : 'assets/userIcon'}
                      alt={`Host ${index + 1}`}
                      className={`h-8 w-8 rounded-full border-2 border-white object-cover ${
                        index !== 0 ? "-ml-2" : ""
                      }`}
                    />
                  ))}
                  {(organization?.members?.length ?? 0) > 5 && <span className="text-xs text-gray-500 ml-2">and more</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg shadow">
            <h3 className="text-xl text-blue-900 mb-3"><b>About Organization</b></h3>
            <p className="text-gray-600 leading-relaxed text-justify">
              {organization?.description}
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow flex flex-col h-auto">
            <h3 className="text-xl text-blue-900 mb-3"><b>Members</b></h3>
            <div className="h-auto overflow-scroll max-h-[500px] w-full">
              <FriendList users={organization?.members}/>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg shadow">
            <h3 className="text-xl text-blue-900 mb-4"><b>Our Events</b></h3>
            <div className="flex flex-row w-full h-auto gap-4 overflow-x-scroll p-2">
                  {organization?.events && organization?.events?.map((event : any, index : any) => (
                    <EventCardSmall key={index} event={event}/>
                  ))}
            </div>
            <a
              href="/events"
              className="block text-right mt-2 text-sm text-blue-600 hover:underline"
            >
              See more events ...
            </a>
          </div>
        </div>

        {/* Sidebar */}
        <div className=" relative flex-1">
          <div className="w-full p-5 rounded-lg shadow max-h-fit flex flex-col gap-3 bg-white lg:sticky lg:top-24">
            <h1 className="text-xl text-blue-900 mb-1"><b>{organization?.name}</b></h1>
            <div className="flex items-center gap-2 text-gray-700 text-sm">
              <p className="flex gap-2"><span>📅</span>{organization?.active_time}</p>
            </div>
            <div className="flex items-center gap-2 text-gray-700 text-sm">
              <p className="flex gap-2"><span>📍</span>{organization?.createdAt}</p>
            </div>
            <div className="flex items-center gap-2 text-gray-700 text-sm">
              <p className="flex gap-2"><span>🏢</span>{organization?.location}</p>
            </div>
            <div className="flex items-center gap-2 text-gray-700 text-sm">
              <p className="flex gap-2"><span>⭐</span>{organization?.contact}</p>
            </div>
            <div className="flex items-center gap-2 text-gray-700 text-sm">
              <p className="flex gap-2"><span>👥</span>{organization?.policy}</p>
            </div>

            <div className="mt-3 mb-4">
              <h4 className="text-base font-semibold text-gray-900 mb-1">
                Short Description :
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
                {organization?.description}
              </p>
            </div>

            <button className="w-full py-3 bg-gray-300 text-gray-900 font-bold rounded-md hover:bg-gray-400 transition">
             Follow Organization
            </button>
            <button className="w-full py-3 bg-gray-400 text-gray-900 font-bold rounded-md hover:bg-gray-400 transition">
              Contact Organization
            </button>
            <button className="w-full py-3 bg-red-600 text-white font-bold rounded-md hover:bg-red-700 transition">
              Report This Organization
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default OrganizationDetailPage