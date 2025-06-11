import { NextRequest, NextResponse } from 'next/server'
import { Organization } from '@/db/models'

export async function GET(_req: NextRequest){
  try {
    const organizations = await Organization.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
    return NextResponse.json(organizations)
  }catch(error){
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
