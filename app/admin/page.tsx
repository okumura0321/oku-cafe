"use client";

import { useEffect, useState } from "react";
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
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";

type Order = {
  id: number;
  items: string;
  createdAt: string;
  status: string;
};

export default function AdminPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    const res = await fetch("/api/orders");
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
      await fetch(`/api/orders/${id}`, {
        method: "DELETE",
      });
      fetchOrders();
    }
  };

  const renderStatus = (status: string) => {
    if (status === "pending") {
      return <Chip label="受付中" color="warning" variant="outlined" />;
    } else if (status === "completed") {
      return <Chip label="完了" color="success" variant="outlined" />;
    } else {
      return <Chip label={status} />;
    }
  };

  return (
    <Box sx={{ padding: 2, maxWidth: "1000px", margin: "0 auto" }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        📋 注文一覧（管理画面）
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mb: 2 }}>
        <Button variant="outlined" onClick={fetchOrders}>
          更新
        </Button>
        <Button
          variant="outlined"
          component={Link}
          href="/admin/deleted"
        >
          削除済み一覧
        </Button>
      </Box>

      {isMobile ? (
        <Box display="flex" flexDirection="column" gap={2}>
          {orders.map((order) => (
            <Paper key={order.id} elevation={2} sx={{ p: 2, borderRadius: 2 }}>
              <Typography fontWeight="bold">ID: {order.id}</Typography>
              <Typography>
                商品: {JSON.parse(order.items).join(", ")}
              </Typography>
              <Typography>
                注文日時: {new Date(order.createdAt).toLocaleString("ja-JP")}
              </Typography>
              <Box mt={1}>{renderStatus(order.status)}</Box>
              <Box mt={2} display="flex" gap={1} flexWrap="wrap">
                {order.status === "pending" && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => markAsCompleted(order.id)}
                  >
                    完了にする
                  </Button>
                )}
                {order.status === "completed" && (
                  <>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => markAsPending(order.id)}
                    >
                      未完了に戻す
                    </Button>
                    <Button
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
          <Table>
            <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>商品</TableCell>
                <TableCell>注文日時</TableCell>
                <TableCell>ステータス</TableCell>
                <TableCell>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{JSON.parse(order.items).join(", ")}</TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleString("ja-JP")}
                  </TableCell>
                  <TableCell>{renderStatus(order.status)}</TableCell>
                  <TableCell>
                    {order.status === "pending" && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => markAsCompleted(order.id)}
                        sx={{ whiteSpace: "nowrap" }}
                      >
                        完了にする
                      </Button>
                    )}
                    {order.status === "completed" && (
                      <>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => markAsPending(order.id)}
                          sx={{ whiteSpace: "nowrap", mr: 1 }}
                        >
                          未完了に戻す
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => deleteOrder(order.id)}
                          sx={{ whiteSpace: "nowrap" }}
                        >
                          削除
                        </Button>
                      </>
                    )}
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
