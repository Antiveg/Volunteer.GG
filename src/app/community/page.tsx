"use client"
import React, { useEffect, useState } from 'react';
import { events_api_result } from '../../dummies/dummy_data_frontend'
import { ErrorBox, Footer, LoadingBox, SearchBar } from '@/components';
import { useOrganizations } from '@/hooks/useOrganizations';
import { OrganizationAttributes, UserAttributes } from '@/types';
import OrganizationCardSmall from '@/components/OrganizationCardSmall';
import { useUsers } from '@/hooks/useUsers';
import { FriendList } from '@/components/FriendList';

const OrganizationPage = () => {

  const {
    data: organizations,
    isLoading,
    isError,
    error
  } = useOrganizations()

  const [filteredOrganizations, setFilteredOrganizations] = useState<OrganizationAttributes[]>([])
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    if (organizations && organizations.length > 0) {
      setFilteredOrganizations(organizations)
    }
  }, [organizations])

  const handleSearch = (search : string) => {
    setSearch(search)
    const filteredOrganizations = organizations.filter((organization : OrganizationAttributes) => organization.name.toLowerCase().includes(search.toLowerCase()))
    setFilteredOrganizations(filteredOrganizations)
  }

  if(isLoading){
    return <LoadingBox message="Fetching event list..."/>
  }

  if(isError){
    return <ErrorBox error={error as any}/>
  }

  return (
    <div className="flex flex-1 flex-col">
      <SearchBar search={search} handleSearch={handleSearch}/>
      {filteredOrganizations && filteredOrganizations?.length > 0 &&
        <main className="mb-10 mt-4 w-128 flex grid gap-4 grid-rows-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-gray-100 p-2 rounded-lg">
          {filteredOrganizations.map(organization => (
            <OrganizationCardSmall key={organization.id} organization={organization}/>
          ))}
        </main>
      }
    </div>
  )
}

const FriendListPage = () => {

  const {
    data: users,
    isLoading,
    isError,
    error
  } = useUsers()

  const [filteredUsers, setFilteredUsers] = useState<UserAttributes[]>([])
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    if (users && users.length > 0) {
      setFilteredUsers(users)
    }
  }, [users])

  const handleSearch = (search : string) => {
    setSearch(search)
    const filteredUsers = users.filter((user : UserAttributes) => user.name.toLowerCase().includes(search.toLowerCase()))
    setFilteredUsers(filteredUsers)
  }

  if(isLoading){
    return <LoadingBox message="Fetching friend list..."/>
  }

  if(isError){
    return <ErrorBox error={error as any}/>
  }

  return (
    <div className="flex flex-1 flex-col">
      <SearchBar search={search} handleSearch={handleSearch}/>
      {filteredUsers && filteredUsers?.length > 0 &&
        <main className="mb-10 mt-4 w-128 flex flex-col h-96 overflow-scroll">
          <FriendList users={filteredUsers}/>
        </main>
      }
    </div>
  )
}

const SubTab = ({title, text, clicked} : any) => {
    return (
        <div onClick={clicked} className="relative group text-gray-200 py-4 flex flex-col justify-center items-center cursor-pointer h-auto p-2 gap-1 w-1/2  border-b-2 hover:border-b-8 border-orange-100 hover:text-orange-100 transition-all duration-300 ease-in-out overflow-hidden">
            <p className="text-lg mx-12 text-center h-auto"><b>{title}</b></p>
            <p className="text-sm mx-12 text-center h-auto line-clamp-3">{text}</p>
            <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none">
              <div className="w-full h-full bg-gradient-to-t from-orange-100 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500 ease-in-out" />
            </div>
        </div>
    )
}

const Community = () => {

  const subPages = [<OrganizationPage/>, <FriendListPage/>]
  const [subpageidx, setSubPage] = useState(0)

  return (
    <div className="absolute top-0 w-full h-auto flex flex-col bg-white">
      <div className="relative w-full h-60">
        <img src="https://img.freepik.com/free-photo/successful-happy-business-team_53876-74892.jpg?semt=ais_items_boosted&w=740" alt="[X]"
        className="absolute top-0 h-60 w-full object-cover z-[0] brightness-[25%]"/>
        <div className="absolute flex flex-row justify-center w-full bottom-0 z-[1]">
          <SubTab 
          title="Organizations"
          text="Connect, Contribute, and Grow. be part of a purpose-driven community, develop your skills, and make a meaningful impact — one at a time" 
          clicked={() => setSubPage(0)}/>
          <SubTab
          title="People"
          text="Good friends are like stars in the sky — you don't always see them, but you know they're always there in times of need." 
          clicked={() => setSubPage(1)}/>
          {/* <SubTab logo={ai_logo} text="Evaluation" clicked={() => setSubPage(3)}/> */}
        </div>
      </div>
      <section className="flex flex-col flex-1 mx-20 my-6 min-h-96">
        {subPages[subpageidx]}
      </section>
      <Footer/>
    </div>
  )
}

export default Community