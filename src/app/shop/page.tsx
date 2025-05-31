"use client"
import { ErrorBox, LoadingBox } from "@/components";
import { HoverEffect } from "@/components/ui/card-hover-effect"
import { useItems } from "@/hooks/useItems";
import { useSession } from "next-auth/react";

const projects = [
  {
    title: "Stripe",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
  },
  {
    title: "Netflix",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "https://netflix.com",
  },
  {
    title: "Google",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "https://google.com",
  },
  {
    title: "Meta",
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: "https://meta.com",
  },
  {
    title: "Amazon",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    link: "https://amazon.com",
  },
  {
    title: "Microsoft",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://microsoft.com",
  },
];

export default function Shop() {

  const { data : session, status } = useSession()

  const {
    data: items,
    isLoading,
    isError,
    error
  } = useItems()

  if(isLoading){
    return <LoadingBox message="fetching purchasable souvenirs..."/>
  }

  if(isError){
    return <ErrorBox error={error as any}/>
  }

  return (
    <div className="max-w-5xl mx-auto px-8 flex flex-col">
      <h3 className="text-2xl"><b>SOUVENIR SHOP</b></h3>
      <p>Turn your contributions into memories — trade points for treasures!</p>
      <p className="text-end"><b>Usable Pts :</b> {session?.user?.usable_points ? `${session?.user?.usable_points} Pts` : "??? ( must sign in )"}</p>
      <HoverEffect items={items} />
    </div>
  );
}
