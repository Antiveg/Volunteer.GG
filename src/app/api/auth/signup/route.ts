import { NextRequest } from 'next/server'
import { User } from '@/db/models'
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest){
  try{
    const body = await req.json();
    const { name, email, password, location } = body

    if(!name || !email || !password || !location){
      return Response.json({ error: 'Missing fields' }, { status: 400 })
    }

    const existing = await User.findOne({ where: { email } });
    if(existing){
      return Response.json({ error: 'Email already registered' }, { status: 409 });
    }

    const [city, province, country] = location.split(",").map((part : string) => part.trim());
    const hashed_password = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      name,
      email,
      password: hashed_password,
      city,
      province,
      country
    })

    return Response.json({ user: newUser }, { status: 201 });
  }catch (err){
    console.error(err)
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}