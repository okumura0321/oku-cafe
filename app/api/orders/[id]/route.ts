import { NextResponse, type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// PATCH: ステータス更新（completed / pending）
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { status } = await req.json();

  const updated = await prisma.order.update({
    where: { id: Number(id) },
    data: { status },
  });

  return NextResponse.json(updated);
}

// DELETE: 注文の削除
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.order.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ message: "注文を削除しました" });
}
