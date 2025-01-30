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
        textAlign: "center",
        backgroundColor: tabIndex === 0 ? "#f5f5f5" : "#333",
        transition: "background-color 0.3s ease-in-out",
      }}
    >
      <Box
        sx={{
          backgroundColor: tabIndex === 0 ? "#e0f7fa" : "#333",
          borderBottom: 1,
          borderColor: "divider",
          transition: "background-color 0.3s ease-in-out",
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          centered
          textColor="primary"
          indicatorColor="primary"
          TabIndicatorProps={{
            style: {
              backgroundColor: "#007FFF",
              height: "3px",
            },
          }}
          sx={{
            "& .MuiTab-root": {
              fontSize: "18px",
              fontWeight: 600,
              fontFamily: "Oswald, sans-serif",
              color: tabIndex === 0 ? "#333" : "#FFF",
              minWidth: "120px",
            },
            "& .Mui-selected": {
              background: "linear-gradient(135deg, rgba(0, 174, 239, 0.4), rgba(0, 174, 239, 0.7))",
              borderRadius: "8px",
              boxShadow: "0px 4px 10px rgba(0, 174, 239, 0.5)",
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
