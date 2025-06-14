import { NextResponse } from 'next/server'
import Item from '@/db/models/item'

export async function GET(){
  try{
    const items = await Item.findAll()
    return NextResponse.json(items)
  }catch(error){
    console.log("error", error)
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 })
  }
}
