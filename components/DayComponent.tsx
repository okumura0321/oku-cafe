import React, { FC } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Image from 'next/image';

const dayTheme = createTheme({
  typography: {
    fontFamily: 'Futura, Arial, sans-serif',
  },
  palette: {
    background: {
      default: '#FFFBCC',
    },
    text: {
      primary: '#333333',
    },
  },
});

const menuItems = [
  { category: 'Drinks', items: [
    { name: 'コーヒー', image: '/images/hot-coffee.jpg', description: '・ホット\n・アイス\n・カフェオレ' },
    { name: '紅茶', image: '/images/hot-tea.jpg', description: '・ホット\n・アイス' },
    { name: 'フレーバー', image: '/images/flavor.jpg', description: '・レモンティー\n・はちみつ\n' },
  ]},
  { category: 'Kids Menu', items: [
    { name: '水', image: '/images/water.png', description: '' },
    { name: 'お茶', image: '/images/tea.jpg', description: '・緑茶\n・麦茶' },
    { name: 'ジュース', image: '/images/orange-juice.jpg', description: '・オレンジ\n・りんご\n・ぶどう' },
    { name: 'ミルク', image: '/images/milk.png', description: '・アイス\n・ホット' },
  ]}
];

const DayComponent: FC = () => (
  <ThemeProvider theme={dayTheme}>
    <div>
      <Box
        sx={{
          padding: 4,
          backgroundColor: dayTheme.palette.background.default,
          minHeight: '100vh',
          color: dayTheme.palette.text.primary,
        }}
      >
        {menuItems.map((menu) => (
          <Box key={menu.category} sx={{ marginBottom: 6 }}>
            <Typography variant="h3" gutterBottom>
              {menu.category}
            </Typography>
            <Grid container spacing={4}>
              {menu.items.map((item) => (
                <Grid item xs={12} sm={6} key={item.name}>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'left' }}>
                    <Box sx={{ flexShrink: 0 }}>
                      <Image src={item.image} alt={item.name} width={150} height={150} style={{ borderRadius: '8px' }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" gutterBottom sx={{ textAlign: 'left' }}>
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
    </div>
  </ThemeProvider>
);

export default DayComponent;
