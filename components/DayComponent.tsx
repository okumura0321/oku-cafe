import React, { FC, useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import Link from "next/link";
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
        description: "・ストレート\n・ミルク\n・レモン",
      },
      {
        name: "ﾌﾚｰﾊﾞｰﾃｨｰ",
        image: "/images/flavor.jpg",
        description: "・フルーツ系\n・はちみつ紅茶\n・おまかせ",
      },
      { name: "お茶", image: "/images/tea.jpg", description: "・緑茶\n・麦茶" },
    ],
  },
  {
    category: "Kids Menu",
    items: [
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
      {
        name: "その他",
        image: "/images/water.png",
        description: "・お水\n・白湯",
      },
    ],
  },
];

const DayComponent: FC = () => {
  const [selectedItem, setSelectedItem] = useState<{
    name: string;
    options: string[];
  } | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
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
          <Link href="/my-orders">
            <Button variant="outlined" sx={{ mb: 2 }}>
              注文履歴を見る
            </Button>
          </Link>
          <Box sx={{ textAlign: "left", mb: 4 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                borderBottom: "4px solid #FF5722",
                display: "inline-block",
                pb: 1,
              }}
            >
              昼のメニュー
            </Typography>
          </Box>

          {menuItems.map((menu) => (
            <Accordion
              key={menu.category}
              sx={{ backgroundColor: dayTheme.palette.background.default }}
            >
              <AccordionSummary
                expandIcon={
                  <KeyboardArrowDown sx={{ color: "brown", fontSize: 30 }} />
                }
              >
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", color: "#FF5722" }}
                >
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
    flexDirection: "column",
    border: "1px solid #ddd",
    borderRadius: 2,
    padding: 2,
    boxSizing: "border-box",
    minHeight: 260, // 縦幅を節約
    backgroundColor: "#fffde7", // より柔らかい背景色（昼らしさ）
  }}
>
  <Box sx={{ textAlign: "center", mb: 1 }}>
    <Image
      src={item.image}
      alt={item.name}
      width={140}
      height={140}
      style={{ borderRadius: "8px" }}
    />
  </Box>

  <Typography
    variant="h6"
    gutterBottom
    sx={{ textAlign: "left", fontWeight: 550, mb: 0.5 }}
  >
    {item.name}
  </Typography>

  <Typography
    variant="body2"
    sx={{
      whiteSpace: "pre-line",
      textAlign: "left",
      color: "#555",
      fontSize: "0.85rem",
      mb: 1,
    }}
  >
    {item.description}
  </Typography>

  <Box sx={{ textAlign: "right", mt: "auto" }}>
    <Button
      variant="contained"
      color="primary"
      size="small"
      onClick={async () => {
        const options = item.description
          .split("\n")
          .map((line) => line.replace("・", "").trim())
          .filter(Boolean);

        if (options.length === 0) {
          const response = await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: [item.name] }),
          });

          const data = await response.json();
          const stored = localStorage.getItem("myOrderIds");
          const ids = stored ? JSON.parse(stored) : [];
          ids.push(data.id);
          localStorage.setItem("myOrderIds", JSON.stringify(ids));
          alert("注文を受け付けました！");
          return;
        }

        setSelectedItem({ name: item.name, options });
        setSelectedOption(options[0]);
        setDialogOpen(true);
      }}
    >
      注文する
    </Button>
  </Box>
</Box>
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}

          <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>注文内容を選択</DialogTitle>
            <DialogContent>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                {selectedItem?.name} の種類を選んでください
              </Typography>
              <RadioGroup
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                {selectedItem?.options.map((opt) => (
                  <FormControlLabel
                    key={opt}
                    value={opt}
                    control={<Radio />}
                    label={opt}
                  />
                ))}
              </RadioGroup>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>キャンセル</Button>
              <Button
                variant="contained"
                onClick={async () => {
                  const itemLabel = `${selectedItem?.name}（${selectedOption}）`;
                  const response = await fetch("/api/orders", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ items: [itemLabel] }),
                  });

                  const data = await response.json();
                  const stored = localStorage.getItem("myOrderIds");
                  const ids = stored ? JSON.parse(stored) : [];
                  ids.push(data.id);
                  localStorage.setItem("myOrderIds", JSON.stringify(ids));

                  alert("注文を受け付けました！");
                  setDialogOpen(false);
                }}
              >
                注文する
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default DayComponent;
