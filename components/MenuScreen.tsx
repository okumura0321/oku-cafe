"use client";

import React, { useState } from "react";
import { Box, Typography, ThemeProvider, Button } from "@mui/material";
import Link from "next/link";
import MenuList from "./MenuList";
import OrderDialog from "./OrderDialog";
import { useOrder } from "@/hooks/useOrder";
import { Theme } from "@mui/material/styles";

// ---- 型定義 ----
export interface MenuItemType {
  name: string;
  description: string;
  image?: string;
}

export interface MenuGroup {
  category: string;
  items: MenuItemType[];
}

interface Props {
  title: string;
  menuItems: MenuGroup[];
  theme: Theme;
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

  // カテゴリ名が必要なので第2引数で受ける
  const handleOrder = (item: MenuItemType, category: string) => {
    const isNoteCategory = noteCategory && category === noteCategory;

    const options = isNoteCategory
      ? noteOptions || []
      : item.description
          .split("\n")
          .map((line) => line.replace("・", "").trim())
          .filter(Boolean);

    if (options.length === 0) {
      // オプションがない場合は即送信
      submitOrder(item.name);
    } else {
      // ダイアログでオプション選択
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
          fontFamily: '"Kiwi Maru", serif',
        }}
      >
        {/* 履歴リンク */}
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

        {/* メニュー一覧（カテゴリごと） */}
        <MenuList
          menuItems={menuItems}
          themeColor={themeColor}
          backgroundColor={bgColor}
          onOrder={handleOrder}
        />

        {/* オプション選択ダイアログ */}
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
