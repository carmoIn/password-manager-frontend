import type { AppProps } from 'next/app'
import { ThemeProvider, createTheme  } from '@mui/material';
import { CacheProvider } from "@emotion/react";
import { EmotionCache } from '@emotion/cache';

// fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Theme
import '@/styles/globals.css'
import createEmotionCache from "@/utils/createEmotionCache";
import lightThemeOptions from '@/styles/theme/lightTheme';

interface CacheAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const defaultTheme = createTheme(lightThemeOptions)

function MyApp({
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps
}: CacheAppProps) {
  return (
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={defaultTheme}>
            <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
  );
}

export default MyApp
