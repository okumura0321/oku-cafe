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

const MenuList = ({ menuItems, themeColor, backgroundColor, onOrder }) => (
  <>
    {menuItems.map((menu) => (
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
            {menu.items.map((item) => (
              <Box
                key={item.name}
                sx={{
                  width: { xs: "100%", sm: "48%", md: "30%" },
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  padding: 2,
                  minHeight: 260,
                  backgroundColor: "#fff",
                }}
              >
                <Box sx={{ textAlign: "center", mb: 1 }}>
                  <Image src={item.image} alt={item.name} width={140} height={140} style={{ borderRadius: "8px" }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 550 }}>{item.name}</Typography>
                <Typography variant="body2" sx={{ whiteSpace: "pre-line", fontSize: "0.85rem", color: "#555", mb: 1 }}>
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
