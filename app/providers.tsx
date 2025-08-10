// app/providers.tsx
'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

export default function Providers({ children }: { children: React.ReactNode }) {
  // フォントは CSS 変数を参照（layout.tsx 側で className に設定済み）
  const theme = createTheme({
    typography: {
      fontFamily: [
        'var(--font-kiwi-maru)',
        'var(--font-geist-sans)',
        'system-ui',
        '-apple-system',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans JP"',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
      ].join(', '),
    },
  });

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
