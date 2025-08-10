import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// PATCH: ステータス更新（completed / pending）
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { status } = (await req.json()) as { status: "pending" | "completed" };

  const updated = await prisma.order.update({
    where: { id: Number(id) },
    data: { status },
  });

  return NextResponse.json(updated);
}

// DELETE: 論理削除（deletedAt を設定）
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.order.update({
    where: { id: Number(id) },
    data: { deletedAt: new Date() },
  });

  return NextResponse.json({ message: "注文を削除しました" });
}
