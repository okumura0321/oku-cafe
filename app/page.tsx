"use client";

import React, { FC, useEffect, useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import DayComponent from "@/components/DayComponent";
import NightComponent from "@/components/NightComponent";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const Home: FC = () => {
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("tabIndex");
    if (saved) {
      setTabIndex(Number(saved));
    } else {
      const h = new Date().getHours();
      setTabIndex(h >= 9 && h < 18 ? 0 : 1);
    }
  }, []);

  return (
    <div className={oswald.className}>
      <Box sx={{ backgroundColor: tabIndex === 0 ? "#e0f7fa" : "#333", pb: 2 }}>
        <Tabs
          value={tabIndex}
          onChange={(_, val) => {
            setTabIndex(val);
            localStorage.setItem("tabIndex", val.toString());
          }}
          centered
          sx={{
            "& .MuiTab-root": {
              fontSize: 18,
              fontWeight: 600,
              color: tabIndex === 0 ? "#333" : "#FFF",
              minWidth: 120,
            },
            "& .Mui-selected": {
              background: "linear-gradient(135deg, rgba(0, 174, 239, 0.4), rgba(0, 174, 239, 0.7))",
              borderRadius: "8px",
            },
          }}
        >
          <Tab label="Day" />
          <Tab label="Night" />
        </Tabs>
      </Box>
      {tabIndex === 0 ? <DayComponent /> : <NightComponent />}
    </div>
  );
};

export default Home;
