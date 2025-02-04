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
  const [tabIndex, setTabIndex] = useState<number>(0);

  useEffect(() => {
    const savedIndex = localStorage.getItem("tabIndex");
    if (savedIndex) {
      setTabIndex(parseInt(savedIndex, 10));
    } else {
      const currentHour = new Date().getHours();
      setTabIndex(currentHour >= 9 && currentHour < 18 ? 0 : 1);
    }
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number): void => {
    setTabIndex(newValue);
    localStorage.setItem("tabIndex", newValue.toString());
  };

  return (
    <div
      className={oswald.className}
      style={{
        minHeight: "100vh",
        padding: "20px",
        transition: "background 0.5s ease-in-out",
        background: tabIndex === 0
          ? "linear-gradient(135deg, #FFFDE4, #FFF1BA)"
          : "linear-gradient(135deg, #2C3E50, #4CA1AF)",
      }}
    >
      <Box
        sx={{
          backgroundColor: "transparent",
          borderRadius: "12px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          mb: 4,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          textColor="inherit"
          indicatorColor="secondary"
          TabIndicatorProps={{
            style: {
              backgroundColor: tabIndex === 0 ? "#FFC107" : "#FF5722",
              height: "4px",
              borderRadius: "4px",
            },
          }}
          sx={{
            "& .MuiTab-root": {
              fontSize: "1.1rem",
              fontWeight: 600,
              textTransform: "none",
              minWidth: "120px",
              transition: "color 0.3s ease",
            },
            "& .Mui-selected": {
              color: tabIndex === 0 ? "#FF5722" : "#FFC107",
            },
          }}
        >
          <Tab label="Day" />
          <Tab label="Night" />
        </Tabs>
      </Box>
      <Box>
        {tabIndex === 0 ? <DayComponent /> : <NightComponent />}
      </Box>
    </div>
  );
};

export default Home;
