import { NextResponse, NextRequest } from 'next/server';
import { EventParticipant } from '@/db/models';
import { parseForm } from '@/lib/uploadService';
import { Readable } from 'stream';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest){

  const session = await getServerSession(authOptions)
  if(!session){
    return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 })
  }

  const body = await req.arrayBuffer()
  const stream = Readable.from(Buffer.from(body))

  // @ts-expect-error: unknown type property of stream
  stream.headers = Object.fromEntries(req.headers.entries())

  try{
    const { fields, files } = await parseForm(stream)

    const { event_id, user_id } = fields
    const file = files?.file[0]

    if(!file){
      return NextResponse.json({ error: 'Invalid file' }, { status: 400 })
    }

    const filename = file.newFilename || file.originalFilename || file.filepath.split('/').pop()
    const fileUrl = `/uploads/${filename}`

    await EventParticipant.update(
      { proof_url: fileUrl },
      { where: { event_id, user_id } }
    )

    return NextResponse.json({ success: true, proof_url: fileUrl })
  }catch(err){
    console.log("error", err)
    return NextResponse.json({ error: 'Upload or DB update failed' }, { status: 500 })
  }
}
