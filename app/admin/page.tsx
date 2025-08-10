"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
  Chip,
  Tooltip,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";

type Order = {
  id: number;
  items: string;
  createdAt: string;
  status: "pending" | "completed" | string;
};

export default function AdminPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    const res = await fetch("/api/orders", { cache: "no-store" });
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const markAsCompleted = async (id: number) => {
    await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "completed" }),
    });
    fetchOrders();
  };

  const markAsPending = async (id: number) => {
    await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "pending" }),
    });
    fetchOrders();
  };

  const deleteOrder = async (id: number) => {
    if (confirm("本当に削除しますか？")) {
      await fetch(`/api/orders/${id}`, { method: "DELETE" });
      fetchOrders();
    }
  };

  const renderStatus = (status: string) => {
    if (status === "pending") {
      return <Chip label="受付中" color="warning" variant="outlined" size="small" />;
    } else if (status === "completed") {
      return <Chip label="完了" color="success" variant="outlined" size="small" />;
    } else {
      return <Chip label={status} size="small" />;
    }
  };

  // items(JSON) を安全に配列へ
  const parsed = useMemo(
    () =>
      orders.map((o) => {
        let list: string[] = [];
        try {
          const tmp = JSON.parse(o.items);
          list = Array.isArray(tmp) ? tmp : [String(tmp)];
        } catch {
          list = [o.items];
        }
        return { ...o, itemList: list as string[] };
      }),
    [orders]
  );

  return (
    <Box sx={{ p: 2, maxWidth: 1000, mx: "auto" }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        📋 注文一覧（管理画面）
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mb: 2 }}>
        <Button variant="outlined" onClick={fetchOrders}>
          更新
        </Button>
        <Button variant="outlined" component={Link} href="/admin/deleted">
          削除済み一覧
        </Button>
      </Box>

      {isMobile ? (
        <Box display="flex" flexDirection="column" gap={1.5}>
          {parsed.map((order) => (
            <Paper key={order.id} elevation={2} sx={{ p: 1.5, borderRadius: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 0.5,
                }}
              >
                <Typography fontWeight="bold">ID: {order.id}</Typography>
                {renderStatus(order.status)}
              </Box>

              <Tooltip title={order.itemList.join(", ")} placement="top" arrow>
                <Typography
                  sx={{
                    fontSize: 14,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  商品: {order.itemList.join(", ")}
                </Typography>
              </Tooltip>

              <Typography sx={{ fontSize: 12, color: "text.secondary", mt: 0.5 }}>
                {new Date(order.createdAt).toLocaleString("ja-JP")}
              </Typography>

              <Box
                sx={{
                  mt: 0.75,
                  display: "flex",
                  gap: 0.5,
                  flexWrap: "wrap",
                  justifyContent: "flex-end",
                }}
              >
                {order.status === "pending" ? (
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => markAsCompleted(order.id)}
                  >
                    完了
                  </Button>
                ) : (
                  <>
                    <Button
                      size="small"
                      variant="outlined"
                      color="secondary"
                      onClick={() => markAsPending(order.id)}
                    >
                      未完了に戻す
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => deleteOrder(order.id)}
                    >
                      削除
                    </Button>
                  </>
                )}
              </Box>
            </Paper>
          ))}
        </Box>
      ) : (
        <Paper elevation={3} sx={{ overflowX: "auto", borderRadius: 3 }}>
          <Table size="small" stickyHeader>
            <TableHead sx={{ backgroundColor: "#f7f7f7" }}>
              <TableRow>
                <TableCell sx={{ width: 200, whiteSpace: "nowrap" }}>ID / ステータス</TableCell>
                <TableCell>商品</TableCell>
                <TableCell sx={{ width: 200, whiteSpace: "nowrap" }}>注文日時</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {parsed.map((order) => (
                <TableRow key={order.id} hover>
                  <TableCell sx={{ py: 0.5 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography fontWeight="bold">#{order.id}</Typography>
                      <Box sx={{ ml: "auto" }}>{renderStatus(order.status)}</Box>
                    </Box>
                  </TableCell>

                  <TableCell
                    sx={{
                      maxWidth: 560,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Tooltip title={order.itemList.join(", ")} placement="top" arrow>
                      <span>{order.itemList.join(", ")}</span>
                    </Tooltip>
                  </TableCell>

                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    {new Date(order.createdAt).toLocaleString("ja-JP")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
}
