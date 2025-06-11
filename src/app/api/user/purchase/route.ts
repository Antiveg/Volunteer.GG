import { NextResponse, userAgent } from 'next/server';
import { Item, User, UserHistory, UserPurchase } from "@/db/models"
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  try {

    const session = await getServerSession(authOptions);
    if (!session) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const { type, amount, item_id } = await req.json();

    // Ensure valid data
    if (!type || !amount) {
      return NextResponse.json({ error: "Missing purchase details" }, { status: 400 });
    }

    if (type === "point" && session.user.usable_points < amount) {
      return NextResponse.json({ error: "Insufficient points" }, { status: 400 });
    }

    if (type === "money") {
        const item = await Item.findOne({
            attributes: ['money_price'],
            where: {
                id: item_id
            }
        })
        const money_price = item?.get('money_price')
        const purchase = await UserPurchase.create({ 
            user_id: session.user.id, 
            item_id: item_id,
            money_price: money_price,
        })
        await UserHistory.create({
            point_change: 0,
            user_id: session.user.id,
            content: `Purchased item for Rp.${money_price}`,
            history_origin: "Purchase",
            purchase_id: purchase.get('id'),
        })
    } else if (type === "point") {
        const item = await Item.findOne({
            attributes: ['point_price'],
            where: {
                id: item_id
            }
        })
        const point_price = Number(item?.get('point_price'))
        const purchase = await UserPurchase.create({ 
            user_id: session.user.id, 
            item_id: item_id,
            point_price: point_price,
        })
        await User.update({ 
            usable_points: session.user.usable_points - point_price
        }, { where: { id: session.user.id }})
        await UserHistory.create({
            point_change: 0 - Number(point_price),
            content: `Purchased item for ${point_price} Pts`,
            history_origin: "Souvenir Purchase",
            purchase_id: purchase.get('id'),
        })
    }

    return NextResponse.json({ success: true, message: `${amount} ${type} purchased` });
  } catch (error) {
    console.error("Purchase error:", error);
    return NextResponse.json({ error: "Failed to complete purchase" }, { status: 500 });
  }
}
