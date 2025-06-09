import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { EventParticipant } from '@/db/models';
import { parseForm } from '@/lib/uploadService';

export const config = {
  api: {
    bodyParser: false, // required for file upload
  },
};

export async function POST(req: Request) {
  try {
    const { fields, files } = await parseForm(req);
    const { event_id, user_id } = fields;
    const file = files.file;

    if (!file || Array.isArray(file)) {
      return NextResponse.json({ error: 'Invalid file' }, { status: 400 });
    }

    const buffer = await file.toBuffer();
    const fileName = `${Date.now()}-${file.originalFilename}`;
    const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);

    await writeFile(filePath, buffer);
    const fileUrl = `/uploads/${fileName}`;

    await EventParticipant.update(
      { proof_url: fileUrl },
      { where: { event_id, user_id } }
    );

    return NextResponse.json({ success: true, proof_url: fileUrl });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Upload or DB update failed' }, { status: 500 });
  }
}
