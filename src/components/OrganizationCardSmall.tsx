"use client"
import React from 'react'
import Link from 'next/link'
import { OrganizationAttributes } from '@/types'
import { Button } from './ui/button'
import DOMPurify from 'dompurify'

interface Props {
  organization: OrganizationAttributes & {
    hosted_count?: number
  }
}

const OrganizationCardSmall = ({ organization } : Props) => {
  if (!organization) {
    return <div></div>
  }

  const renderStars = (rating : number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<span key={i} className={i <= rating ? "text-yellow-400" : "text-gray-300"} >★</span>);
    }
    return stars;
  };

  const {
    logo_url, name, avg_rating, credibility,
    description, id
  } = organization

  const organization_details_url = `/organization-detail/${id}`

  return (
    <Link href={organization_details_url} className="block no-underline text-inherit rounded-xl transform transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg w-full">
      <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col relative w-full h-auto font-sans p-4 gap-2">
        <div className="relative flex w-full flex-row gap-2">
          <img
            src={logo_url || 'assets/landscape-placeholder.svg'}
            alt={name}
            className="w-1/4 object-cover block"
          />
          <div className="flex flex-col h-full w-auto justify-center">
            <div className="text-lg line-clamp-1"><b>{name}</b></div>
            <div className=" text-sm">
                Event Hosted : <strong>5</strong>
            </div>
            <div className=" text-sm">
                Credibility : 
                <span className={credibility === "Trusted" ? "text-green-600" : ""}>
                <b> {credibility}</b>
                </span>
            </div>
            <div className="flex items-center gap-1 text-sm">
                <div className="flex text-lg">{renderStars(avg_rating ?? 0)}</div> {avg_rating ?? 0}/5.0
            </div>
          </div>
        </div>
        <hr />
        <p className="w-full line-clamp-3 min-h-[4.5rem] text-sm" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description as string) }}/>
        <div className="flex flex-row justify-end gap-2">
            <Button variant="default">See More</Button>
        </div>
      </div>
    </Link>
  )
}

export default OrganizationCardSmall;