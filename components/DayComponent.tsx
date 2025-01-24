import React, { FC } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Image from 'next/image';

const dayTheme = createTheme({
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
    { name: 'ホットコーヒー', image: '/images/hot-coffee.jpg', description: '' },
    { name: 'アイスコーヒー', image: '/images/ice-coffee.jpg', description: '' },
    { name: 'カフェオレ', image: '/images/Cafeaulait.jpg', description: '' },
    { name: '紅茶', image: '/images/hot-tea.jpg', description: 'レモンティーor\nミルクティー' },
    { name: 'アイスティー', image: '/images/ice-tea.jpg', description: 'レモンティーor\nミルクティー' },
  ]},
  { category: 'Kids Menu', items: [
    { name: '水', image: '/images/water.png', description: 'ミネラルウォーター' },
    { name: 'お茶', image: '/images/tea.jpg', description: 'ウーロン茶or麦茶' },
    { name: 'オレンジジュース', image: '/images/orange-juice.jpg', description: 'フレッシュ100%' },
    { name: 'リンゴジュース', image: '/images/apple-juice.jpg', description: 'りんごぉ' },
    { name: 'ミルク', image: '/images/milk.png', description: '' },
  ]}
];

const DayComponent: FC = () => (
  <ThemeProvider theme={dayTheme}>
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

export default DayComponent;
