"use client"
import ErrorBox from "@/components/ErrorBox";
import LoadingBox from "@/components/LoadingBox";
import { useUsers } from "@/hooks/useUsers";
import { UserAttributes } from "@/types";

export default function Leaderboard() {

  const {
    data: users,
    isLoading,
    isError,
    error
  } = useUsers()

  if(isLoading){
    return <LoadingBox message="Loading..."/>
  }

  if(isError){
    return <ErrorBox error={error as any}/>
  }

  return (
    <div className="h-full flex flex-col mx-48 mb-10 justify-center relative">
        {/* <LeaderboardAreaSelector /> */}
        <div className="ml-auto flex flex-row top-0 right-0 bg-orange-100 rounded-full">
          
          <div className="cursor-pointer px-6 py-1 text-gray-800 font-sans text-base rounded-full transition-colors duration-300 hover:bg-[#ffe0cc] hover:text-black">
            All
          </div>
          <div className="cursor-pointer px-6 py-1 text-gray-800 font-sans text-base rounded-full transition-colors duration-300 hover:bg-[#ffe0cc] hover:text-black">
            National
          </div>
          <div className="cursor-pointer px-6 py-1 text-gray-800 font-sans text-base rounded-full transition-colors duration-300 hover:bg-[#ffe0cc] hover:text-black">
            Province
          </div>
          <div className="cursor-pointer px-6 py-1 text-gray-800 font-sans text-base rounded-full transition-colors duration-300 hover:bg-[#ffe0cc] hover:text-black">
            Local
          </div>
        </div>

        {/* <LeaderboardTopThree /> */}
        <div className="w-full h-auto flex justify-center gap-4 my-4">
          <div 
          className="border-white border flex justify-end rounded-lg items-end font-sans flex-col items-center w-auto py-6 px-12 mt-8 bg-gray-200 shadow-lg">
            <h1 className="text-5xl mb-2"><b>2#</b></h1>
            <p className="text-center">{users && users[1].name}</p>
            <p className="text-center">{users && users[1].monthly_points} Pts</p>
          </div>
          <div 
          className="border-white border flex justify-end rounded-lg items-end font-sans flex-col items-center w-auto py-6 px-12 bg-yellow-200 shadow-lg">
            <h1 className="text-5xl mb-2"><b>1#</b></h1>
            <p className="text-center">{users && users[0].name}</p>
            <p className="text-center">{users && users[0].monthly_points} Pts</p>
          </div>
          <div 
          className="border-white border flex justify-end rounded-lg items-end font-sans flex-col items-center w-auto py-6 px-12 mt-16 bg-orange-200 shadow-lg">
            <h1 className="text-5xl mb-2"><b>3#</b></h1>
            <p className="text-center">{users && users[2].name}</p>
            <p className="text-center">{users && users[2].monthly_points} Pts</p>
          </div>
        </div>

        {/* <LeaderboardRankings/> */}
        <div className="w-full flex flex-grow flex-col min-h-48 h-full gap-2 overflow-scroll p-2">
          {users && users.slice(3).map((user : UserAttributes, index : number) => (
            <div key={index} className="flex items-center p-3 rounded-lg transition-colors duration-200 bg-orange-100 shadow-md">
              <div className="text-2xl font-bold text-gray-800 mr-4 min-w-[40px] text-left">
                #{index + 4}
              </div>
              <div className="w-9 h-9 rounded-full bg-gray-300 mr-4 flex-shrink-0"></div>
              <div className="flex-grow text-lg text-gray-700">{user.name}</div>
              <div className="text-base font-medium text-gray-600 min-w-[70px] text-right">
                {user.monthly_points} Pts
              </div>
            </div>
          ))}
        </div>
        <div className="h-0.5 bg-red-600 rounded my-4"></div>
        <div className="flex items-center p-3 rounded-lg transition-colors duration-200 bg-orange-300 shadow-md">
          <div className="text-2xl font-bold text-gray-800 mr-4 min-w-[40px] text-left">
            #{"N/A"}
          </div>
          <div className="w-9 h-9 rounded-full bg-gray-300 mr-4 flex-shrink-0"></div>
          <div className="flex-grow text-lg text-gray-700">Temporary</div>
          <div className="text-base font-medium text-gray-600 min-w-[70px] text-right">
            {2000} Pts
          </div>
        </div>
    </div>
  );
}