import type { AppProps } from 'next/app'
import { ThemeProvider, createTheme } from '@mui/material'
import { CacheProvider } from '@emotion/react'
import { EmotionCache } from '@emotion/cache'

// fonts
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

// Theme
import '@/styles/globals.css'
import createEmotionCache from '@/utils/createEmotionCache'
import lightThemeOptions from '@/styles/theme/lightTheme'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import UserService from '@/services/user.service'

interface CacheAppProps extends AppProps {
    emotionCache?: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

const defaultTheme = createTheme(lightThemeOptions)

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }: CacheAppProps) {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [authorized, setAuthorized] = useState(false)

    useEffect(() => {
        // on initial load - run auth check
        authCheck(router.asPath)

        // on route change start - hide page content by setting authorized to false
        const hideContent = () => setAuthorized(false)
        router.events.on('routeChangeStart', hideContent)

        // on route change complete - run auth check
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent)
            router.events.off('routeChangeComplete', authCheck)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in
        const publicPaths = ['/auth/login', '/auth/register']
        const path = url.split('?')[0]
        if (!UserService.getAuthenticatedToken() && !publicPaths.includes(path)) {
            setAuthorized(false)
            router.push({
                pathname: '/auth/login',
                query: { returnUrl: router.asPath },
            })
        } else {
            setAuthorized(true)
        }
    }

    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={defaultTheme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </CacheProvider>
    )
}

export default MyApp
