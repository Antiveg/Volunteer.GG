import { NextRequest } from 'next/server';
import { parseForm } from '@/lib/uploadService';
import { Readable } from 'stream';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { CategorizedEvent, Event, EventImage, EventParticipant } from '@/db/models';

export async function POST(req: NextRequest){

  const session = await getServerSession(authOptions)
  if(!session){
    return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 })
  }

  const body = await req.arrayBuffer()
  const stream = Readable.from(Buffer.from(body))
  
  // @ts-expect-error: unknown type property of stream
  stream.headers = Object.fromEntries(req.headers.entries())

  try {
    const { fields, files } = await parseForm(stream);

    const eventData = {
      name: fields.name[0],
      location: fields.location[0],
      start_datetime: new Date(fields.start_datetime[0]),
      end_datetime: new Date(fields.end_datetime[0]),
      description: fields.description[0],
      base_points: parseInt(fields.base_points[0], 10),
      final_points: parseInt(fields.base_points[0], 10),
      creator_id: session.user.id,
      organization_id: (session.user.organization_id ?? null)
    }

    const event = await Event.create(eventData)

    await EventParticipant.create({
      user_id: session.user.id,
      event_id: event.get('id'),
      status: "leader",
    })

    if(fields.category){
      await CategorizedEvent.create({
        event_id: event.get('id'),
        category_id: parseInt(fields.category[0], 10),
      })
    }

    const eventImages = Array.isArray(files.event_images)
      ? files.event_images
      : [files.event_images];

    await Promise.all(
      eventImages.map(async (file : any) => {
        const filename = file.newFilename || file.originalFilename || file.filepath.split('/').pop()
        const imgUrl = `/uploads/${filename}`
        await EventImage.create({
          event_id: event.get('id'),
          img_url: imgUrl,
        })
      })
    )

    return new Response(JSON.stringify({ message: "Event created", fields, files }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  }catch(error){
    console.error("Upload error", error)
    return new Response("Upload failed", { status: 500 })
  }
}
