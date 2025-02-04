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
      default: "#FFF9E3",
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
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              borderBottom: "4px solid #FF5722",
              display: "inline-block",
              pb: 1,
            }}
          >
            昼メニュー
          </Typography>
        </Box>

        {menuItems.map((menu) => (
          <Accordion
            key={menu.category}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "12px",
              mb: 2,
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={<KeyboardArrowDown sx={{ color: "#FF5722", fontSize: 30 }} />}
              sx={{ borderRadius: "12px" }}
            >
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "#FF5722" }}>
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
                {menu.items.map((item) => (
                  <Card
                    key={item.name}
                    sx={{
                      width: { xs: "100%", sm: "48%", md: "30%" },
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "12px",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      transition: "transform 0.3s ease",
                      "&:hover": { transform: "scale(1.03)" },
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

export default DayComponent;
