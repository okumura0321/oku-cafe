import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const nightTheme = createTheme({
  palette: {
    background: {
      default: '#2C3E50',
    },
    text: {
      primary: '#ECF0F1',
    },
  },
});

const NightComponent: FC = () => (
  <ThemeProvider theme={nightTheme}>
    <Box
      sx={{
        padding: 2,
        backgroundColor: nightTheme.palette.background.default,
        height: '100vh',
        color: nightTheme.palette.text.primary,
      }}
    >
      <Typography variant="h3" gutterBottom>
        Alcohol Menu
      </Typography>
      <Box component="ul" sx={{ listStyle: 'none', padding: 0 }}>
        <Box component="li" sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <img src="/images/beer.jpg" alt="Beer" style={{ width: '50px', marginRight: '10px' }} />
          <Typography variant="h6">Beer</Typography>
        </Box>
        <Box component="li" sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <img src="/images/wine.jpg" alt="Wine" style={{ width: '50px', marginRight: '10px' }} />
          <Typography variant="h6">Wine</Typography>
        </Box>
        <Box component="li" sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <img src="/images/cocktail.jpg" alt="Cocktails" style={{ width: '50px', marginRight: '10px' }} />
          <Typography variant="h6">Cocktails</Typography>
        </Box>
        <Box component="li" sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <img src="/images/whiskey.jpg" alt="Whiskey" style={{ width: '50px', marginRight: '10px' }} />
          <Typography variant="h6">Whiskey</Typography>
        </Box>
      </Box>
    </Box>
  </ThemeProvider>
);

export default NightComponent;
