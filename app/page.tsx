"use client";

import React, { FC, useEffect } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { useState } from 'react';
import DayComponent from '@/components/DayComponent';
import NightComponent from '@/components/NightComponent';

const Home: FC = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  useEffect(() => {
    // Determine the initial tab based on the time and localStorage
    const savedIndex = localStorage.getItem('tabIndex');
    if (savedIndex) {
      setTabIndex(parseInt(savedIndex, 10));
    } else {
      const currentHour = new Date().getHours();
      // Default to NIGHT if it's outside of 9:00 to 17:00
      setTabIndex(currentHour >= 9 && currentHour < 18 ? 0 : 1);
    }
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number): void => {
    setTabIndex(newValue);
    localStorage.setItem('tabIndex', newValue.toString()); // Save the selected tab index
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <Box
        sx={{
          backgroundColor: '#f4f4f4',
          borderBottom: 1,
          borderColor: 'divider',
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
              backgroundColor: '#007FFF',
              height: '3px',
            },
          }}
          sx={{
            '& .MuiTab-root': {
              fontSize: '18px',
              fontWeight: 600,
            },
          }}
        >
          <Tab label="Day" style={{ minWidth: '120px' }} />
          <Tab label="Night" style={{ minWidth: '120px' }} />
        </Tabs>
      </Box>
      <Box>
        {tabIndex === 0 ? (
          <DayComponent />
        ) : (
          <NightComponent />
        )}
      </Box>
    </div>
  );
};

export default Home;
