"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  TextField,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useTheme } from "@mui/material/styles";

type Order = {
  id: number;
  items: string; // JSON文字列
  status: string;
  createdAt: string;      // 注文日時
  deletedAt: string | null;
};

export default function DeletedOrdersPage() {
  const theme = useTheme();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  // フィルタUI用（注文日時で検索）
  const [from, setFrom] = useState<string>(""); // YYYY-MM-DD
  const [to, setTo] = useState<string>("");
  const [allItems, setAllItems] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]); // 候補のみ

  const renderStatus = (status: string) => {
    if (status === "pending") {
      return <Chip label="受付中" color="warning" variant="outlined" />;
    } else if (status === "completed") {
      return <Chip label="完了" color="success" variant="outlined" />;
    }
    return <Chip label={status} />;
  };

  const fetchDeleted = async (params?: {
    from?: string;
    to?: string;
    items?: string[];
  }) => {
    const qs = new URLSearchParams();
    if (params?.from) qs.set("from", params.from); // createdAt で検索
    if (params?.to) qs.set("to", params.to);       // createdAt で検索
    params?.items?.forEach((it) => it && qs.append("item", it));

    setLoading(true);
    try {
      const res = await fetch(
        `/api/orders/deleted${qs.toString() ? `?${qs.toString()}` : ""}`,
        { cache: "no-store" }
      );
      const data = (await res.json()) as Order[];
      setOrders(data);

      // 初回ロード時に候補を作成（重複排除）
      if (!params) {
        const set = new Set<string>();
        data.forEach((o) => {
          try {
            (JSON.parse(o.items) as string[]).forEach((x) => set.add(x));
          } catch {
            /* noop */
          }
        });
        setAllItems(Array.from(set).sort());
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 初回は全削除済み一覧を取得（候補抽出のため）
    fetchDeleted();
  }, []);

  const handleSearch = () => {
    const items = Array.from(new Set(selectedItems)).filter(Boolean);
    fetchDeleted({
      from: from || undefined,
      to: to || undefined,
      items: items.length ? items : undefined,
    });
  };

  const resetFilters = () => {
    setFrom("");
    setTo("");
    setSelectedItems([]);
    fetchDeleted();
  };

  const rows = useMemo(() => {
    return orders.map((o) => {
      let parsed: string[] = [];
      try {
        parsed = JSON.parse(o.items) as string[];
      } catch {
        /* noop */
      }
      return {
        ...o,
        itemsArray: parsed,
      };
    });
  }, [orders]);

  return (
    <Box sx={{ p: 2, maxWidth: 1100, m: "0 auto" }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        🗑️ 削除済み注文一覧（論理削除）
      </Typography>

      {/* フィルタUI（注文日時で検索） */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 2,
          borderRadius: 2,
          background: theme.palette.mode === "dark" ? "#222" : "#fafafa",
        }}
      >
        <Box
          sx={{
            display: "grid",
            // JSの条件分岐ではなく、レスポンシブCSSで列数を制御
            gridTemplateColumns: {
              xs: "1fr",            // ~sm
              sm: "repeat(4, 1fr)", // sm~
            },
            gap: 2,
            alignItems: "center",
          }}
        >
          <TextField
            label="注文日時（From）"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            helperText="JSTで検索（当日0:00から）"
          />
          <TextField
            label="注文日時（To）"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={to}
            onChange={(e) => setTo(e.target.value)}
            helperText="JSTで検索（当日23:59:59まで）"
          />
          <Autocomplete
            multiple
            options={allItems} // 手入力不可（候補のみ）
            value={selectedItems}
            onChange={(_e, v) => setSelectedItems(v)}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="商品の種類（複数選択）"
                placeholder="候補から選択"
              />
            )}
          />
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="contained" onClick={handleSearch} disabled={loading}>
              検索
            </Button>
            <Button variant="outlined" onClick={resetFilters} disabled={loading}>
              クリア
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* 一覧（Table サイズは固定） */}
      <Paper elevation={3} sx={{ overflowX: "auto", borderRadius: 3 }}>
        <Table size="small">
          <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>商品</TableCell>
              <TableCell>注文日時</TableCell>
              <TableCell>削除日時</TableCell>
              <TableCell>ステータス</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.itemsArray.join(", ")}</TableCell>
                <TableCell>
                  {new Date(row.createdAt).toLocaleString("ja-JP")}
                </TableCell>
                <TableCell>
                  {row.deletedAt
                    ? new Date(row.deletedAt).toLocaleString("ja-JP")
                    : "-"}
                </TableCell>
                <TableCell>{renderStatus(row.status)}</TableCell>
              </TableRow>
            ))}
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  {loading ? "読み込み中..." : "該当するデータがありません。"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
