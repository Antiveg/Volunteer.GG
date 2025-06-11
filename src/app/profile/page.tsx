"use client"
import { ErrorBox, Footer, FriendList, LoadingBox } from '@/components';
import { useProfile } from '@/hooks/useProfile';
import { useSessionRedirect } from '@/hooks/useSessionRedirect';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaGift, FaHandsHelping, FaHistory, FaMedal, FaTrophy, FaUser } from 'react-icons/fa';

const Profile = () =>  {

    const { status } = useSessionRedirect()
    const router = useRouter()

    const { data: profileData, isLoading, isError, error } = useProfile()

    const [listidx, setList] = useState(0)
    
    const lists = [
      <HistoryList history={profileData?.history}/>,
      <AchievementList achievements={profileData?.achievements} certificates={profileData?.certificates}/>,
      <AssociateList friends={profileData?.friends}/>,
    ]

    if(status === "unauthenticated"){
        return <LoadingBox message="Redirected to signin..."/>
    }

    if(isLoading){
        return <LoadingBox message="Fetching user information..."/>
    }

    if(isError){
        return <ErrorBox error={error as any}/>
    }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-inter">
      <main className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        <section className="md:col-span-3 flex flex-row bg-white p-6 rounded-lg shadow-xl relative overflow-hidden gap-4">
          <div className="relative z-10 flex items-center space-x-6 mb-6 h-full">
            <div className="flex-shrink-0">
              <img src={profileData?.user?.img_url ?? "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"} alt="Profile" className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-gray-300 shadow-lg object-cover" />
            </div>
            <div className="flex flex-col h-full">
              <h2 className="text-3xl font-bold mb-2 text-gray-900">{profileData.user.name}</h2>
              <div className="flex flex-row gap-x-4 gap-y-2 text-sm text-gray-600">
                <span>Age : {profileData?.age ?? "?"}</span>
                <span>Gender : {profileData.gender ?? "?"}</span>
                <span>Points Accumulated : {profileData.user.total_points ?? 0} Pts</span>
              </div>
              <p className="text-sm text-gray-700 mt-2 relative z-10">Bio :</p>
              <p className="line-clamp-3 text-sm bg-gray-200/50 p-2 rounded-lg flex flex-1">{profileData.user.bio}</p>
            </div>
          </div>

          <div className="flex justify-between items-center relative z-10 flex-col flex-1">
            <div className="text-right justify-center items-center flex gap-2 flex-col">
              <img src={profileData?.user?.OrganizationMembers?.[0]?.Organization?.logo_url} alt="Organization Logo" className="w-28 h-28 object-cover rounded-lg" />
              <p className="text-sm text-gray-600 mb-2 line-clamp-1">{profileData.user?.OrganizationMembers?.[0]?.Organization?.name}</p>
            </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 shadow-md" onClick={() => router.push(`/organization-detail/${profileData.user?.OrganizationMembers?.[0]?.Organization?.id}`)}>
                See Organization
              </button>
          </div>
        </section>

        <aside className="md:col-span-1 bg-white p-6 rounded-lg shadow-xl flex flex-col justify-between items-center text-center">
          <p className="text-gray-600 text-sm mb-2">You current local ranking</p>
          <div className="text-7xl font-bold text-blue-600 mb-4">#N/A</div> 
          <a href="#" className="text-blue-700 hover:underline">See Leaderboard...</a>
        </aside>

        <nav className="md:col-span-1 bg-white p-6 rounded-lg shadow-xl space-y-4">
          {[
            { icon: <FaHistory className="h-6 w-6"/>, label: 'History', onclick: () => setList(0) },
            { icon: <FaTrophy className="h-6 w-6"/>, label: 'Achievements', onclick: () => setList(1) },
            { icon: <FaUser className="h-6 w-6"/>, label: 'Associates', onclick: () => setList(2) },
          ].map((item) => (
            <a key={item.label} href="#" className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-200 transition-colors duration-200" onClick={item.onclick}>
              {item.icon}
              <span className="text-lg font-medium text-gray-800">{item.label}</span>
            </a>
          ))}
        </nav>

        <section className="flex flex-col md:col-span-3 bg-white p-6 rounded-lg shadow-xl gap-6">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">Summary</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="flex flex-col">
              <span className="text-gray-500">Events Joined: </span>
              <span className="text-gray-800 font-semibold">{profileData?.history?.filter((hist : any) => hist.event_id !== null).length ?? 0}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500">Biggest Points Obtained: </span>
              <span className="text-gray-800 font-semibold">{profileData?.history?.point_change ?? 0} Pts</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500">Accumulated Points: </span>
              <span className="text-gray-800 font-semibold">{profileData?.user?.total_points ?? 0} Pts</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500">First Joined: </span>
              <span className="text-gray-800 font-semibold">{new Date(profileData?.user?.createdAt)?.toLocaleString() ?? "Invalid Date"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500">Last Joined: </span>
              <span className="text-gray-800 font-semibold">{new Date(profileData?.user?.createdAt)?.toLocaleString() ?? "Invalid Date"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500">Achievements: </span>
              <span className="text-gray-800 font-semibold">{profileData?.achievements?.filter((ach : any) => ach.is_achieved === true).length ?? 0}</span>
            </div>
          </div>
        </section>
        {lists[listidx]}
      </main>
      <Footer/>
    </div>
  );
}

const HistoryList = ({ history } : any) => {
    return (
        <section className="flex flex-col gap-4 md:col-span-4 bg-white p-6 rounded-lg shadow-xl max-h-[500px] overflow-y-scroll">
          <h3 className="text-2xl font-bold text-gray-900">User History</h3>
            {history.map((data: any, i: number) => {
                if (data.event_id) {
                    return (
                        <div key={i} className="bg-gray-100 p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center shadow-sm">
                          <FaHandsHelping className="h-16 w-16"/>
                            <div className="ml-4 mr-auto">
                                <p className="text-lg font-medium text-gray-800">{data?.Event?.name}</p>
                                <p className="text-sm text-gray-600">{data?.Event?.location}</p>
                                <p className="text-sm text-gray-400"><i>{data?.content}</i></p>
                            </div>
                            <div className="flex flex-col gap-6">
                              <p className="text-xs text-gray-500 mb-auto">{data?.Event?.end_datetime ? new Date(data.Event.end_datetime).toLocaleString() : 'Invalid Date'}</p>
                              <span className="text-right text-green-600 font-semibold text-lg whitespace-nowrap">
                                  {data.point_change} Points
                              </span>
                            </div>
                        </div>
                    );
                }else if(data.purchase_id){
                    return (
                        <div key={i} className="bg-gray-100 p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center shadow-sm">
                          <FaGift className="h-16 w-16"/>
                            <div className="ml-4 mr-auto">
                                <p className="text-lg font-medium text-gray-800">Purchased {data?.UserPurchase?.Item?.name}</p>
                                <p className="text-sm text-gray-600">Item type : {data?.UserPurchase?.Item?.type}</p>
                                <p className="text-sm text-gray-400 line-clamp-1"><i>{data?.UserPurchase?.Item?.description}</i></p>
                            </div>
                            <div className="flex flex-col gap-6">
                              <p className="text-xs text-gray-500 mb-auto">{data?.UserPurchase?.createdAt ? new Date(data.UserPurchase.createdAt).toLocaleString() : 'Invalid Date'}</p>
                              <span className={`text-right font-semibold text-lg whitespace-nowrap ${data?.point_change <= 0 ? 'text-red-500' : "text-green-600"}`}>
                                  {data.point_change} Points
                              </span>
                            </div>
                        </div>
                    );
                }
            })}
        </section>
    )
}

const AchievementList = ({ achievements, certificates } : any) => {

  console.log(achievements)
    return (
      <section className="flex flex-col gap-4 md:col-span-4 bg-white p-6 rounded-lg shadow-xl max-h-[500px] overflow-y-scroll">
          <div className="flex flex-col">
            <p className="text-xl mb-4"><b>Achievements</b></p>
            <div className="flex flex-col gap-4">
              {achievements && achievements.map((ach : any, i: number) => (
                <div key={i} className={`p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center shadow-sm ${ach?.is_achieved ? "bg-green-100" : "bg-gray-100"}`}>
                  <FaMedal className="h-12 w-12"/>
                    <div className="ml-4 mr-auto">
                        <p className="text-lg font-medium text-gray-800">{ach?.title}</p>
                        <p className="text-sm text-gray-600">Item type : {ach?.description}</p>
                        <p className="text-sm text-gray-400 line-clamp-1"><i>Must achieved at least {ach?.min_points} pts of contribution</i></p>
                    </div>
                    <div className="flex flex-col gap-6">
                      <p className="text-xs text-gray-500 mb-auto">{ach?.updatedAt ? new Date(ach.updatedAt).toLocaleString() : 'Invalid Date'}</p>
                      <span className="text-right font-semibold text-lg whitespace-nowrap">
                          {ach?.is_achieved ? "Achieved" : "Ongoing"}
                      </span>
                    </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-xl mb-4"><b>Certificate</b></p>
            <div className="grid grid-cols-4 gap-4">
              {certificates && certificates.map((cer : any, i: number) => (
                <div key={i} className={`p-2 rounded-lg flex flex-col items-start sm:items-center shadow-sm ${cer?.is_achieved ? "bg-green-100" : "bg-gray-100"}`}>
                  <img src={cer?.certificate_url} alt="Certificate" className="rounded-lg mb-2"/>
                  <div className="flex flex-col w-full px-2">
                      <p className="text-sm font-medium text-gray-400">Cert. ID : {cer?.id}</p>
                      <p className="text-sm font-medium text-gray-400">Obtained at : {cer?.createdAt ? new Date(cer.createdAt).toLocaleString() : 'Invalid Date'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
      </section>
    )
}

const AssociateList = ({ friends } : any) => {
    return (
      <section className="flex flex-col gap-4 md:col-span-4 bg-white p-6 rounded-lg shadow-xl max-h-[500px] overflow-y-scroll">
        <h3 className="text-2xl font-bold text-gray-900">User Associates</h3>
        <FriendList users={friends}/>
      </section>
    )
}

export default Profile