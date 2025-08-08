// app/api/orders/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// PATCH: ステータス更新（completed / pending）
export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  const { status } = await req.json();

  const updated = await prisma.order.update({
    where: { id: Number(id) },
    data: { status },
  });

  return NextResponse.json(updated);
}

// DELETE: 注文の削除（物理削除 ※後で論理削除に対応可能）
export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  await prisma.order.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ message: "注文を削除しました" });
}
