// app/api/orders/[id]/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { status } = await req.json();
  const updated = await prisma.order.update({
    where: { id: Number(params.id) },
    data: { status },
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.order.delete({
    where: { id: Number(params.id) },
  });
  return NextResponse.json({ message: "注文を削除しました" });
}
