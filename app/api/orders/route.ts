import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const { items } = body;

  const newOrder = await prisma.order.create({
    data: {
      items: JSON.stringify(items),
    },
  });

  return NextResponse.json(newOrder);
}

export async function GET() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(orders);
}
