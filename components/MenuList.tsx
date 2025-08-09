import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Button,
} from "@mui/material";
import Image from "next/image";
import { KeyboardArrowDown } from "@mui/icons-material";

// ---- 型定義 ----
export interface MenuItemType {
  name: string;
  description: string;
  image?: string; // 画像は任意
}

export interface MenuGroup {
  category: string;
  items: MenuItemType[];
  note?: string; // 使っているので任意で追加
}

interface Props {
  menuItems: MenuGroup[];
  themeColor: string;
  backgroundColor: string;
  onOrder: (item: MenuItemType, category: string) => void;
}

const MenuList: React.FC<Props> = ({ menuItems, themeColor, backgroundColor, onOrder }) => (
  <>
    {menuItems.map((menu: MenuGroup) => (
      <Accordion key={menu.category} sx={{ backgroundColor }}>
        <AccordionSummary expandIcon={<KeyboardArrowDown sx={{ color: themeColor }} />}>
          <Typography variant="h4" sx={{ fontWeight: "bold", color: themeColor }}>
            {menu.category}
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          {menu.note && (
            <Typography variant="h6" sx={{ fontStyle: "italic", mb: 1 }}>
              {menu.note}
            </Typography>
          )}

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center" }}>
            {menu.items.map((item: MenuItemType) => (
              <Box
                key={item.name}
                sx={{
                  width: { xs: "100%", sm: "48%", md: "30%" },
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  p: 2,
                  minHeight: 260,
                  backgroundColor: "#fff",
                }}
              >
                <Box sx={{ textAlign: "center", mb: 1 }}>
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={140}
                      height={140}
                      style={{ borderRadius: 8 }}
                    />
                  ) : (
                    <Box sx={{ width: 140, height: 140 }} />
                  )}
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 550 }}>
                  {item.name}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ whiteSpace: "pre-line", fontSize: "0.85rem", color: "#555", mb: 1 }}
                >
                  {item.description}
                </Typography>

                <Box sx={{ textAlign: "right", mt: "auto" }}>
                  <Button variant="contained" size="small" onClick={() => onOrder(item, menu.category)}>
                    注文する
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>
    ))}
  </>
);

export default MenuList;
