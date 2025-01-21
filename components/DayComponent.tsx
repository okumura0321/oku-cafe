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
      <Typography variant="h3" gutterBottom>
        Day Menu
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
          <img src="/images/sandwich.jpg" alt="Sandwich" style={{ width: '50px', marginRight: '10px' }} />
          <Typography variant="h6">Sandwich</Typography>
        </Box>
        <Box component="li" sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <img src="/images/salad.jpg" alt="Salad" style={{ width: '50px', marginRight: '10px' }} />
          <Typography variant="h6">Salad</Typography>
        </Box>
      </Box>
    </Box>
  </ThemeProvider>
);

export default DayComponent;
