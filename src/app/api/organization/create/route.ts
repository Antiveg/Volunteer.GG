import { NextRequest } from 'next/server';
import { parseForm } from '@/lib/uploadService';
import { Readable } from 'stream';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Organization, OrganizationMember } from '@/db/models';

export async function POST(req: NextRequest) {

  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
  }

  const body = await req.arrayBuffer();
  const stream = Readable.from(Buffer.from(body));

  // Attach headers because formidable needs them
  // @ts-ignore
  stream.headers = Object.fromEntries(req.headers.entries());

  try {
    const { fields, files } = await parseForm(stream);

    console.log(fields)
    console.log(files)

    // files.event_images could be array or single object depending on upload
    const logoURL = Array.isArray(files.logo_url)
      ? files.logo_url
      : [files.logo_url];

    let listIMG = [] as string[]
    // Save each image record with event_id and URL (based on filepath)
    await Promise.all(
        logoURL.map(async (file : any) => {
            // Extract filename from path — assuming formidable gives you file.filepath
            // If your formidable version uses file.newFilename, adjust accordingly
            const filename = file.newFilename || file.originalFilename || file.filepath.split('/').pop();

            listIMG.push(`/uploads/${filename}`);
        })
    );

    const newOrganization = await Organization.create({
      name: fields.name[0],
      description: fields?.description[0],
      logo_url: listIMG?.[0],
      active_time: fields?.active_time[0],
      location : fields?.location[0],
      phone : fields.phone[0],
      instagram : fields?.instagram?.[0],
      twitter : fields?.twitter?.[0],
      discord : fields?.discord?.[0],
      other : fields?.other?.[0],
      creator_id: session?.user?.id
    })

    await OrganizationMember.create({
        user_id: session.user.id,
        organization_id: newOrganization.get('id'),
        status: "creator"
    })

    return new Response(JSON.stringify({ message: "Organization created", fields, files }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Upload error", error);
    return new Response("Upload failed", { status: 500 });
  }
}
