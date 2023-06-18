import { store } from '@/Store/store';
import { Provider } from 'react-redux';
import React, { ReactElement, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { AppProps } from 'next/app';
import { NextPage } from 'next';
import createEmotionCache from '@/Utils/createEmotoinCache';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@mui/system';
import { CssBaseline } from '@mui/material';
import { createTheme } from '@/theme/admin-theme';
import Layout from '@/components/commons/layout';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// single import for all css
import '@/styles/globals.css';
import '@global/index.scss';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'react-hot-toast';
import { useNProgress } from '@/hooks/use-nprogress';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  const router = useRouter();

  useNProgress();

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      event.preventDefault();
      localStorage.removeItem('user');
      Cookies.remove('token');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [router]);

  return (
    <SessionProvider session={pageProps.session}>
      <CacheProvider value={emotionCache}>
        <Provider store={store}>
          <ThemeProvider theme={createTheme()}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <>
                <CssBaseline />
                <Toaster
                  position="top-right"
                  toastOptions={{
                    style: {
                      zIndex: 99999,
                    },
                    error: {
                      style: {
                        border: 'thin solid red',
                        backgroundColor: '#FFEFEF',
                      },
                    },
                  }}
                />
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </>
            </LocalizationProvider>
          </ThemeProvider>
        </Provider>
      </CacheProvider>
    </SessionProvider>
  );
}
