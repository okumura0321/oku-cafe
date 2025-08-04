// app/api/orders/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PATCH(req: NextRequest, context: any) {
  const { id } = context.params;
  const { status } = await req.json();

  const updated = await prisma.order.update({
    where: { id: Number(id) },
    data: { status },
  });

  return NextResponse.json(updated);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function DELETE(req: NextRequest, context: any) {
  const { id } = context.params;

  await prisma.order.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ message: "注文を削除しました" });
}
