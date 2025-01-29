import React, { FC } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Image from "next/image";
import { Kiwi_Maru } from "next/font/google";
import { KeyboardArrowDown } from "@mui/icons-material";

const kiwiMaru = Kiwi_Maru({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

const dayTheme = createTheme({
  typography: {
    fontFamily: '"Kiwi Maru", serif',
  },
  palette: {
    background: {
      default: "#FFFBCC",
    },
    text: {
      primary: "#333333",
    },
  },
});

const menuItems = [
  {
    category: "Drinks",
    items: [
      {
        name: "コーヒー",
        image: "/images/hot-coffee.jpg",
        description: "・ホット\n・アイス\n・カフェオレ",
      },
      {
        name: "紅茶",
        image: "/images/hot-tea.jpg",
        description: "・ホット\n・アイス",
      },
      {
        name: "ﾌﾚｰﾊﾞｰﾃｨｰ",
        image: "/images/flavor.jpg",
        description: "・レモンティー\n・はちみつ\n",
      },
      { name: "お茶", image: "/images/tea.jpg", description: "・緑茶\n・麦茶" },
    ],
  },
  {
    category: "Kids Menu",
    items: [
      { name: "お水", image: "/images/water.png", description: "" },
      { name: "お茶", image: "/images/mugitea.jpg", description: "・麦茶" },
      {
        name: "ジュース",
        image: "/images/orange-juice.jpg",
        description: "・オレンジ\n・りんご\n・ぶどう",
      },
      {
        name: "ミルク",
        image: "/images/milk.png",
        description: "・アイス\n・ホット",
      },
    ],
  },
];

const DayComponent: FC = () => (
  <ThemeProvider theme={dayTheme}>
    <div className={kiwiMaru.className}>
      <Box
        sx={{
          padding: 4,
          backgroundColor: dayTheme.palette.background.default,
          minHeight: "100vh",
          color: dayTheme.palette.text.primary,
        }}
      >
        <Box sx={{ textAlign: "left", mb: 4 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              borderBottom: "3px solid black",
              paddingBottom: "10px",
            }}
          >
            昼のメニュー
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, fontSize: "1.2rem" }}>
            コーヒーや紅茶など、お昼のひとときを楽しむドリンクをご用意しています。
          </Typography>
        </Box>

        {menuItems.map((menu) => (
          <Accordion
            key={menu.category}
            sx={{ backgroundColor: dayTheme.palette.background.default }}
          >
            <AccordionSummary expandIcon={<KeyboardArrowDown sx={{ color: 'brown', fontSize: 30 }} />}            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  borderBottom: "2px solid black",
                  paddingBottom: "4px",
                }}
              >
                {menu.category}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{ backgroundColor: dayTheme.palette.background.default }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  justifyContent: "center",
                  maxWidth: "1000px",
                  margin: "0 auto",
                }}
              >
                {menu.items.map((item) => (
                  <Box
                    key={item.name}
                    sx={{
                      width: { xs: "100%", sm: "48%", md: "30%" },
                      display: "flex",
                      gap: 2,
                      alignItems: "left",
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 2, alignItems: "left" }}>
                      <Box sx={{ flexShrink: 0 }}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={150}
                          height={150}
                          style={{ borderRadius: "8px" }}
                        />
                      </Box>
                      <Box>
                        <Typography
                          variant="h5"
                          gutterBottom
                          sx={{ textAlign: "left", fontWeight: 550 }}
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          sx={{ whiteSpace: "pre-line", textAlign: "left" }}
                        >
                          {item.description}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </div>
  </ThemeProvider>
);

export default DayComponent;
