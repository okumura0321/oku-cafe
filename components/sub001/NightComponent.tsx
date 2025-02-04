import React, { FC } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardMedia,
  CardContent,
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
      { name: "キリン", image: "/images/kirin.jpg", description: "・一番搾り" },
      { name: "アサヒ", image: "/images/asahi.jpg", description: "・ｽｰﾊﾟｰﾄﾞﾗｲ" },
      {
        name: "Blend",
        image: "/images/shandygaff.jpg",
        description: "・ｼｬﾝﾃﾞｨｶﾞﾌ\n・ｺｰｸﾋﾞｱ\n・ﾊﾟﾅｼｪ\n・ｶｼｽﾋﾞｱ",
      },
    ],
  },
  {
    category: "Cocktail",
    items: [
      {
        name: "Gin",
        image: "/images/gin.jpg",
        description: "・ｼﾞﾝﾄﾆｯｸ\n・ｼﾞﾝﾊﾞｯｸ\n・ｵﾚﾝｼﾞﾌﾞﾛｯｻﾑ\n・ｷﾞﾑﾚｯﾄ",
      },
      {
        name: "Vodka",
        image: "/images/vodka.jpg",
        description: "・ｳｫｯｶﾄﾆｯｸ\n・ﾓｽｺﾐｭｰﾙ\n・ｽｸﾘｭｰﾄﾞﾗｲﾊﾞｰ\n・ﾌﾞﾙﾄﾞｯｸ",
      },
      {
        name: "Rum",
        image: "/images/rum.jpg",
        description: "・ﾗﾑｺｰｸ\n・ﾗﾑﾄﾆｯｸ\n・ｷｭｰﾊﾞﾝｽｸﾘｭｰ\n・ﾊﾞｶﾙﾃﾞｨ",
      },
      {
        name: "Dita",
        image: "/images/dita.jpg",
        description: "・ﾗｲﾁｵﾚﾝｼﾞ\n・ﾁｬｲﾅﾌﾞﾙｰ\n・ｱﾝｼｬﾝﾃ\n・ﾚﾃﾞｨﾃﾞｲ",
      },
      {
        name: "Cassis",
        image: "/images/cassis.jpg",
        description: "・ｶｼｽﾊﾞｯｸ\n・ｶｼｽｵﾚﾝｼﾞ\n・ｶｼｽﾐﾙｸ\n・ｵｰﾛﾗ",
      },
      {
        name: "Mistia",
        image: "/images/mistia.jpg",
        description: "・ﾐｽﾃｨｱﾄﾆｯｸ\n・ﾐｽﾃｨｱﾊﾞｯｸ\n・ｻﾝﾗｲｽﾞ\n・ﾌﾞﾗﾝ",
      },
    ],
  },
  {
    category: "Whisky",
    note: "ﾛｯｸ / ﾊｲﾎﾞｰﾙ / ｼﾞﾝｼﾞｬｰﾊｲﾎﾞｰﾙ",
    items: [
      {
        name: "MACALLAN",
        image: "/images/macallan.jpg",
        description: "(ｽｺｯﾁ)",
      },
      {
        name: "JACK DANIELS",
        image: "/images/jack.jpg",
        description: "(ｱﾒﾘｶﾝ)",
      },
      {
        name: "角",
        image: "/images/kaku.jpg",
        description: "(ｼﾞｬﾊﾟﾆｰｽﾞ)",
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
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              borderBottom: "4px solid #FFC107",
              display: "inline-block",
              pb: 1,
            }}
          >
            夜メニュー
          </Typography>
        </Box>

        {nightMenuItems.map((menu) => (
          <Accordion
            key={menu.category}
            sx={{
              backgroundColor: "rgba(30, 30, 47, 0.8)",
              borderRadius: "12px",
              mb: 2,
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={<KeyboardArrowDownIcon sx={{ color: "#FFC107", fontSize: 30 }} />}
              sx={{ borderRadius: "12px" }}
            >
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "#FFC107" }}>
                {menu.category}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  justifyContent: "center",
                }}
              >
                {menu.note && (
                  <Typography
                    variant="h6"
                    sx={{ textAlign: "center", fontStyle: "italic", width: "100%", mb: 1 }}
                  >
                    {menu.note}
                  </Typography>
                )}
                {menu.items.map((item) => (
                  <Card
                    key={item.name}
                    sx={{
                      width: { xs: "100%", sm: "48%", md: "30%" },
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "12px",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                      transition: "transform 0.3s ease",
                      "&:hover": { transform: "scale(1.03)" },
                      backgroundColor: "#2E2E3F",
                    }}
                  >
                    <CardMedia>
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={300}
                        height={200}
                        style={{
                          width: "100%",
                          height: "auto",
                          borderTopLeftRadius: "12px",
                          borderTopRightRadius: "12px",
                        }}
                      />
                    </CardMedia>
                    <CardContent>
                      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body1" sx={{ whiteSpace: "pre-line", lineHeight: 1.5 }}>
                        {item.description}
                      </Typography>
                    </CardContent>
                  </Card>
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
