"use client"
import { ErrorBox, Footer, LoadingBox } from "@/components";
import EventsGrid from "@/components/EventsGrid";
import { useSessionRedirect } from "@/hooks/useSessionRedirect";
import { useUserEvents } from "@/hooks/useUserEvents";


const Dashboard = () => {

    const { session, status } = useSessionRedirect()

    const {
        data: events,
        isLoading,
        isError,
        error
    } = useUserEvents(Number(session?.user?.id))

    if (status === "loading" || isLoading) {
        return <LoadingBox message="Loading..."/>
    }

    if (!session) {
        return <LoadingBox message="Redirecting to sign in page..."/>
    }

    if (isError){
        return <ErrorBox error={error as any}/>
    }

    const { 
        id,
        name,
        email,
        status: user_status,
        img_url,
        usable_points,
    } = session?.user
    
    return (
        <div className="h-auto flex flex-col w-full gap-12">
            <main className="flex flex-col bg-white gap-4 mx-20">
                <h3 className="flex text-xl"><b>Welcome, {name}! </b><p className="ml-auto text-gray-400">Dashboard</p></h3>
                <div className="flex flex-col sm:flex-row w-full h-auto sm:max-h-36 bg-gray-100 rounded-lg p-4 gap-4">
                    <img
                    src={img_url ? img_url : 'https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png'} 
                    alt="NO IMAGE"
                    className="border border-black rounded-lg"/>
                    <div className="flex flex-col flex-1 justify-center">
                        <p className="flex"><b className="w-28">ID</b> : <span className="ml-2">{id}</span></p>
                        <p className="flex"><b className="w-28">Username</b> : <span className="ml-2">{name}</span></p>
                        <p className="flex"><b className="w-28">Email</b> : <span className="ml-2">{email}</span></p>
                        <p className="flex"><b className="w-28">Status</b> : <span className="ml-2">{user_status}</span></p>
                        <p className="flex"><b className="w-28">Usable Points</b> : <span className="ml-2">{usable_points} Pts</span></p>
                    </div>
                </div>
                <h3 className="flex text-xl"><b>Ongoing Events That You Have Joined</b></h3>
                <div className="flex flex-col sm:flex-row w-full h-auto bg-gray-100 rounded-lg p-2 gap-2">
                    <EventsGrid filteredEvents={events}/>
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default Dashboard