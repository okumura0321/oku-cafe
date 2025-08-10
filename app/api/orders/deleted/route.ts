import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * クエリ:
 *  - from: YYYY-MM-DD（JST 00:00:00 から）※注文日時(createdAt)でフィルタ
 *  - to:   YYYY-MM-DD（JST 23:59:59.999 まで）※注文日時(createdAt)でフィルタ
 *  - item: 繰り返し可（部分一致 OR）
 *
 * 例: /api/orders/deleted?from=2025-08-11&to=2025-08-12&item=コー&item=ラテ
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const from = url.searchParams.get("from");
  const to = url.searchParams.get("to");
  const itemParams = url
    .searchParams
    .getAll("item")
    .map((s) => s.trim())
    .filter(Boolean);

  // 注文日時（createdAt）での期間絞り込み（JST, UTC+9）
  const createdAtFilter: Prisma.DateTimeFilter = {};
  if (from) createdAtFilter.gte = new Date(`${from}T00:00:00.000+09:00`);
  if (to)   createdAtFilter.lte = new Date(`${to}T23:59:59.999+09:00`);

  // 「論理削除のみ」かつ「注文日時で絞り込み」
  const whereClause: Prisma.OrderWhereInput = {
    deletedAt: { not: null },
    ...(from || to ? { createdAt: createdAtFilter } : {}),
  };

  // 一覧は見やすさ重視で「削除日時の新しい順」
  const base = await prisma.order.findMany({
    where: whereClause,
    orderBy: { deletedAt: "desc" },
  });

  // 商品名の部分一致（大文字小文字無視）
  if (itemParams.length === 0) {
    return NextResponse.json(base);
  }
  const needles = itemParams.map((s) => s.toLowerCase());
  const filtered = base.filter((o) => {
    try {
      const arr = (JSON.parse(o.items) as string[]).map((s) => s.toLowerCase());
      return arr.some((item) => needles.some((n) => item.includes(n)));
    } catch {
      return false;
    }
  });

  return NextResponse.json(filtered);
}
