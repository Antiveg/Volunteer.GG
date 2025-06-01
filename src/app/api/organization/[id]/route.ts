import { NextRequest, NextResponse } from 'next/server';
import { Organization } from '@/db/models';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const organization = await Organization.findByPk(params.id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    if (!organization) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    return NextResponse.json(organization);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
