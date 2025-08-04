"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  Button,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type Order = {
  id: number;
  items: string;
  createdAt: string;
  status: string;
};

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchMyOrders = async () => {
    const stored = localStorage.getItem("myOrderIds");
    const ids: number[] = stored ? JSON.parse(stored) : [];

    const res = await fetch("/api/orders");
    const data: Order[] = await res.json();

    const myOrders = data.filter((order) => ids.includes(order.id));
    setOrders(myOrders);
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <Box
      sx={{
        padding: 4,
        maxWidth: 600,
        margin: "0 auto",
        backgroundColor: "#fff8e1", // アイボリー系
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        fontWeight="bold"
        sx={{ color: "#5d4037" }}
      >
        ☕ 自分の注文履歴
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          onClick={() => history.back()}
        >
          メニューに戻る
        </Button>
        <Button variant="outlined" onClick={fetchMyOrders}>
          更新
        </Button>
      </Box>

      {orders.length === 0 ? (
        <Typography sx={{ color: "#6d4c41" }}>注文はまだありません。</Typography>
      ) : (
        <Paper
          elevation={0}
          sx={{
            backgroundColor: "#fff3e0",
            borderRadius: 2,
            padding: 1,
          }}
        >
          <List disablePadding>
            {orders.map((order, index) => (
              <Box key={order.id}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={
                      <Typography fontWeight="bold" color="#4e342e">
                        🛍 {JSON.parse(order.items).join(", ")}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {new Date(order.createdAt).toLocaleString("ja-JP")}
                      </Typography>
                    }
                  />
                  <Chip
                    label={order.status === "completed" ? "完了" : "受付中"}
                    color={order.status === "completed" ? "success" : "warning"}
                    variant="outlined"
                    sx={{ fontWeight: "bold" }}
                  />
                </ListItem>
                {index < orders.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}
