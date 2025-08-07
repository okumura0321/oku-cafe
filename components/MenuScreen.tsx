"use client";

import React, { useState } from "react";
import { Box, Typography, ThemeProvider, Button } from "@mui/material";
import Link from "next/link";
import MenuList from "./MenuList";
import OrderDialog from "./OrderDialog";
import { useOrder } from "@/hooks/useOrder";

interface Props {
  title: string;
  menuItems: any[];
  theme: any;
  themeColor: string;
  bgColor: string;
  noteCategory?: string;
  noteOptions?: string[];
}

const MenuScreen: React.FC<Props> = ({
  title,
  menuItems,
  theme,
  themeColor,
  bgColor,
  noteCategory,
  noteOptions,
}) => {
  const [selectedItem, setSelectedItem] = useState<{ name: string; options: string[] } | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { submitOrder } = useOrder();

  const handleOrder = (item: any, category: string) => {
    const isNoteCategory = noteCategory && category === noteCategory;
    const options = isNoteCategory
      ? noteOptions || []
      : item.description
          .split("\n")
          .map((line: string) => line.replace("・", "").trim())
          .filter(Boolean);

    if (options.length === 0) {
      submitOrder(item.name);
    } else {
      setSelectedItem({ name: item.name, options });
      setSelectedOption(options[0]);
      setDialogOpen(true);
    }
  };

  const handleSubmit = async () => {
    if (!selectedItem) return;
    await submitOrder(`${selectedItem.name}（${selectedOption}）`);
    setDialogOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          p: 4,
          backgroundColor: bgColor,
          minHeight: "100vh",
          color: theme.palette.text.primary,
          fontFamily: '"Kiwi Maru", serif', // 明示的にフォント指定
        }}
      >
        {/* 注文履歴ボタン */}
        <Box sx={{ mb: 2, textAlign: "left" }}>
          <Link href="/my-orders">
            <Button variant="outlined">注文履歴を見る</Button>
          </Link>
        </Box>

        {/* タイトル */}
        <Box sx={{ textAlign: "left", mb: 4 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              borderBottom: `4px solid ${themeColor}`,
              display: "inline-block",
              pb: 1,
            }}
          >
            {title}
          </Typography>
        </Box>

        {/* メニュー一覧 */}
        <MenuList
          menuItems={menuItems}
          themeColor={themeColor}
          backgroundColor={bgColor}
          onOrder={handleOrder}
        />

        {/* ダイアログ */}
        <OrderDialog
          open={dialogOpen}
          selectedItem={selectedItem}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          onClose={() => setDialogOpen(false)}
          onConfirm={handleSubmit}
          themeStyle={{
            bgColor,
            textColor: theme.palette.text.primary,
          }}
        />
      </Box>
    </ThemeProvider>
  );
};

export default MenuScreen;
