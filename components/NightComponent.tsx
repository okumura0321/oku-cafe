import React, { FC } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Image from 'next/image';

const nightTheme = createTheme({
  palette: {
    background: {
      default: '#1E1E2F',
    },
    text: {
      primary: '#FFFFFF',
    },
  },
});

const nightMenuItems = [
  { category: 'Beer', items: [
      { name: 'キリン', image: '/images/kirin.png', description: '' },
      { name: 'アサヒ', image: '/images/asahi.jpg', description: '' },
    ]},
  { category: 'Cocktail', items: [
      { name: 'ジン', image: '/images/gin.jpg', description: '' },
      { name: 'ウオッカ', image: '/images/vodka.jpg', description: '' },
      { name: 'ラム', image: '/images/rum.jpg', description: '' },
      { name: 'ディタ', image: '/images/ditta.jpg', description: '' },
      { name: 'カシス', image: '/images/cassis.jpg', description: '' },
      { name: 'ミスティア', image: '/images/mistia.jpg', description: '' },
    ]},
  { category: 'ウイスキー', items: [
      { name: 'ロック', image: '/images/whiskey.jpg', description: '' },
      { name: 'ハイボール・ジンジャーハイボール', image: '/images/highball.png', description: '' },
    ]},
];

const NightComponent: FC = () => (
  <ThemeProvider theme={nightTheme}>
    <Box
      sx={{
        padding: 4,
        backgroundColor: nightTheme.palette.background.default,
        minHeight: '100vh',
        color: nightTheme.palette.text.primary,
      }}
    >
      {nightMenuItems.map((menu) => (
        <Box key={menu.category} sx={{ marginBottom: 6 }}>
          <Typography variant="h3" gutterBottom>
            {menu.category}
          </Typography>
          <Grid container spacing={4}>
            {menu.items.map((item) => (
              <Grid item xs={12} sm={6} key={item.name}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Box sx={{ flexShrink: 0 }}>
                    <Image src={item.image} alt={item.name} width={120} height={120} style={{ borderRadius: '8px' }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" sx={{ whiteSpace: 'pre-line', textAlign: 'left' }}>
                      {item.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  </ThemeProvider>
);

export default NightComponent;