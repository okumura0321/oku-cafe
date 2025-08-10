import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const { items } = body;

  const newOrder = await prisma.order.create({
    data: {
      items: JSON.stringify(items),
      // status は schema の default を使用
      // deletedAt は null（指定なし）
    },
  });

  return NextResponse.json(newOrder);
}

export async function GET() {
  const orders = await prisma.order.findMany({
    where: { deletedAt: null }, // 論理削除済みは除外
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(orders);
}
