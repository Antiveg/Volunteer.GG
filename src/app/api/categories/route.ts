import { NextResponse } from 'next/server'
import { EventCategory } from '@/db/models'

export async function GET() {

  const categories = await EventCategory.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  })

  return NextResponse.json(categories);
}