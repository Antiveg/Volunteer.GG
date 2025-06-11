"use client"
import { ErrorBox, LoadingBox } from "@/components";
import { HoverEffect } from "@/components/ui/card-hover-effect"
import { useItems } from "@/hooks/useItems";
import { useSession } from "next-auth/react";

export default function Shop() {

  const { data : session } = useSession()

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
