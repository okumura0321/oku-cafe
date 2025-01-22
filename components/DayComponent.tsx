import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
      <Typography variant="h4" gutterBottom>
        Drinks
      </Typography>
      <Box component="ul" sx={{ listStyle: 'none', padding: 0 }}>
        <Box component="li" sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <img src="/images/coffee.jpg" alt="Coffee" style={{ width: '50px', marginRight: '10px' }} />
          <Typography variant="h6">Coffee</Typography>
        </Box>
        <Box component="li" sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <img src="/images/tea.jpg" alt="Tea" style={{ width: '50px', marginRight: '10px' }} />
          <Typography variant="h6">Tea</Typography>
        </Box>
        <Box component="li" sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <img src="/images/juice.jpg" alt="Juice" style={{ width: '50px', marginRight: '10px' }} />
          <Typography variant="h6">Orange Juice</Typography>
        </Box>
      </Box>
      <Typography variant="h4" gutterBottom>
        Kids Menu
      </Typography>
      <Box component="ul" sx={{ listStyle: 'none', padding: 0 }}>
        <Box component="li" sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <img src="/images/sandwich.jpg" alt="Mini Sandwich" style={{ width: '50px', marginRight: '10px' }} />
          <Typography variant="h6">Mini Sandwich</Typography>
        </Box>
        <Box component="li" sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <img src="/images/salad.jpg" alt="Fruit Salad" style={{ width: '50px', marginRight: '10px' }} />
          <Typography variant="h6">Fruit Salad</Typography>
        </Box>
      </Box>
    </Box>
  </ThemeProvider>
);

export default DayComponent;
