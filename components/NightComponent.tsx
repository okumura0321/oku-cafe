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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const kiwiMaru = Kiwi_Maru({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

const nightTheme = createTheme({
  typography: {
    fontFamily: '"Kiwi Maru", serif',
  },
  palette: {
    background: {
      default: "#1E1E2F",
    },
    text: {
      primary: "#FFFFFF",
    },
  },
});

const nightMenuItems = [
  {
    category: "Beer",
    items: [
      { name: "キリン", image: "/images/kirin.png", description: "・一番搾り" },
      {
        name: "アサヒ",
        image: "/images/asahi.jpg",
        description: "・ｽｰﾊﾟｰﾄﾞﾗｲ",
      },
    ],
  },
  {
    category: "Cocktail",
    items: [
      {
        name: "Gin",
        image: "/images/gin.jpg",
        description: "・ｼﾞﾝﾄﾆｯｸ\n・ｼﾞﾝﾗｲﾑ\n・ｼﾞﾝﾘｯｷｰ",
      },
      {
        name: "Vodka",
        image: "/images/vodka.jpg",
        description: "・ｳｫｯｶﾄﾆｯｸ\n・ﾓｽｺﾐｭｰﾙ\n・ｽｸﾘｭｰﾄﾞﾗｲﾊﾞｰ",
      },
      {
        name: "Rum",
        image: "/images/rum.jpg",
        description: "・ﾗﾑｺｰｸ\n・ﾗﾑﾄﾆｯｸ\n",
      },
      { name: "Dita", image: "/images/dita.jpg", description: "・ﾃﾞｨﾀﾄﾆｯｸ" },
      {
        name: "Cassis",
        image: "/images/cassis.jpg",
        description: "・ｶｼｽｵﾚﾝｼﾞ\n・ｶｼｽｿｰﾀﾞ",
      },
      {
        name: "Mistia",
        image: "/images/mistia.jpg",
        description: "・ﾐｽﾃｨｱｿｰﾀﾞ",
      },
      {
        name: "Beer",
        image: "/images/shandygaff.jpg",
        description: "・ｼｬﾝﾃﾞｨｶﾞﾌ\n・ｺｰｸﾋﾞｱ\n・ﾊﾟﾅｼｪ\n・ｶｼｽﾋﾞｱ",
      },
    ],
  },
  {
    category: "Whisky",
    items: [
      {
        name: "MACALLAN",
        image: "/images/macallan.jpg",
        description: "・ﾛｯｸ\n・ﾊｲﾎﾞｰﾙ",
      },
      {
        name: "角",
        image: "/images/kaku.jpg",
        description: "・ﾛｯｸ\n・ﾊｲﾎﾞｰﾙ\n・ｼﾞﾝｼﾞｬｰﾊｲﾎﾞｰﾙ",
      },
    ],
  },
];

const NightComponent: FC = () => (
  <ThemeProvider theme={nightTheme}>
    <div className={kiwiMaru.className}>
      <Box
        sx={{
          padding: 4,
          backgroundColor: nightTheme.palette.background.default,
          minHeight: "100vh",
          color: nightTheme.palette.text.primary,
        }}
      >
        <Box sx={{ textAlign: "left", mb: 4 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              borderBottom: "3px solid white",
              paddingBottom: "10px",
            }}
          >
            夜のメニュー
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, fontSize: "1.2rem" }}>
            カクテルやウィスキーなど、特別な時間を彩るドリンクをご用意しています。
          </Typography>
        </Box>

        {nightMenuItems.map((menu) => (
          <Accordion
            key={menu.category}
            sx={{ backgroundColor: nightTheme.palette.background.default }}
          >
            <AccordionSummary expandIcon={<KeyboardArrowDownIcon sx={{ color: 'gold', fontSize: 30 }} />}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  borderBottom: "2px solid white",
                  paddingBottom: "4px",
                }}
              >
                {menu.category}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{ backgroundColor: nightTheme.palette.background.default }}
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
                          width={140}
                          height={140}
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

export default NightComponent;
