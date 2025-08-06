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
      {
        name: "アサヒ",
        image: "/images/asahi.jpg",
        description: "・ｽｰﾊﾟｰﾄﾞﾗｲ",
      },
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
      {
        name: "Amaretto",
        image: "/images/amaretto.jpg",
        description: "・ｱﾏﾚｯﾄｼﾞﾝｼﾞｬｰ\n・ｽﾌﾟﾓｰﾆ\n・ｽﾌﾟﾗｯｼｭ\n・ｽｲｰﾄﾊﾞｰﾄﾝｼｯﾌﾟ",
      },
      {
        name: "Peche",
        image: "/images/peche.jpg",
        description: "・ﾌｧｼﾞｰﾈｰﾌﾞﾙ\n・ﾋﾟｰﾁｸﾞﾚｰﾌﾟﾌﾙｰﾂ\n・ﾌﾙｰﾂﾐｯｸｽ\n・ｽｲｰﾄﾗﾊﾞｰﾄﾞ",
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

const NightComponent: FC = () => {
  const [selectedItem, setSelectedItem] = useState<{
    name: string;
    options: string[];
  } | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
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
                borderBottom: "4px solid #FFC107",
                display: "inline-block",
                pb: 1,
              }}
            >
              夜のメニュー
            </Typography>
          </Box>

          {nightMenuItems.map((menu) => (
            <Accordion
              key={menu.category}
              sx={{ backgroundColor: nightTheme.palette.background.default }}
            >
              <AccordionSummary
                expandIcon={
                  <KeyboardArrowDownIcon sx={{ color: "gold", fontSize: 30 }} />
                }
              >
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", color: "#FFC107" }}
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
                  {menu.note && (
                    <Typography
                      variant="h6"
                      sx={{ textAlign: "left", fontStyle: "italic", mb: 1 }}
                    >
                      {menu.note}
                    </Typography>
                  )}
                  {menu.items.map((item) => (
                    <Box
                      key={item.name}
                      sx={{
                        width: { xs: "100%", sm: "48%", md: "30%" },
                        display: "flex",
                        gap: 2,
                      }}
                    >
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

                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          sx={{ mt: 1}}
                          onClick={async () => {
                            const options =
                              menu.category === "Whisky"
                                ? ["ﾛｯｸ", "ﾊｲﾎﾞｰﾙ", "ｼﾞﾝｼﾞｬｰﾊｲﾎﾞｰﾙ"]
                                : item.description
                                    .split("\n")
                                    .map((line) =>
                                      line.replace("・", "").trim()
                                    )
                                    .filter(Boolean);

                            // 選択肢がない場合は即注文
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
                              localStorage.setItem(
                                "myOrderIds",
                                JSON.stringify(ids)
                              );

                              alert("注文を受け付けました！");
                              return;
                            }

                            // 選択肢がある場合はモーダルを開く
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

          <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            PaperProps={{
              sx: {
                backgroundColor: nightTheme.palette.background.default,
                color: nightTheme.palette.text.primary,
              },
            }}
          >
            <DialogTitle sx={{ color: nightTheme.palette.text.primary }}>
              注文内容を選択
            </DialogTitle>
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
                    control={<Radio sx={{ color: "white" }} />}
                    label={opt}
                    sx={{ color: "white" }}
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

export default NightComponent;
