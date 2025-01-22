import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
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

const DayComponent: FC = () => (
  <ThemeProvider theme={dayTheme}>
    <Box
      sx={{
        padding: 2,
        backgroundColor: dayTheme.palette.background.default,
        height: '100vh',
        color: dayTheme.palette.text.primary,
      }}
    >
      <Typography variant="h3" gutterBottom>
        Drinks
      </Typography>
      <Box component="ul" sx={{ listStyle: 'none', padding: 0 }}>
        <Box component="li" sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <Image src="/images/coffee.jpg" alt="Coffee" width={50} height={50} style={{ marginRight: '10px' }} />
          <Typography variant="h6">Coffee</Typography>
        </Box>
        <Box component="li" sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <Image src="/images/tea.jpg" alt="Tea" width={50} height={50} style={{ marginRight: '10px' }} />
          <Typography variant="h6">Tea</Typography>
        </Box>
        <Box component="li" sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <Image src="/images/juice.jpg" alt="Juice" width={50} height={50} style={{ marginRight: '10px' }} />
          <Typography variant="h6">Juice</Typography>
        </Box>
      </Box>
      <Typography variant="h3" gutterBottom>
        Kids Menu
      </Typography>
      <Box component="ul" sx={{ listStyle: 'none', padding: 0 }}>
        <Box component="li" sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <Image src="/images/sandwich.jpg" alt="Mini Sandwich" width={50} height={50} style={{ marginRight: '10px' }} />
          <Typography variant="h6">Mini Sandwich</Typography>
        </Box>
        <Box component="li" sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <Image src="/images/salad.jpg" alt="Fruit Salad" width={50} height={50} style={{ marginRight: '10px' }} />
          <Typography variant="h6">Fruit Salad</Typography>
        </Box>
      </Box>
    </Box>
  </ThemeProvider>
);

export default DayComponent;
