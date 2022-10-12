import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'
import Grid from '@mui/material/Grid'
import CssBaseline from '@mui/material/CssBaseline'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import * as React from 'react'
import { Copyright } from '@/components/accounts/Copyright'

export { Layout }

type LayoutProps = {
    children: ReactNode
}

function Layout({ children }: LayoutProps) {
    const router = useRouter()

    useEffect(() => {
        // redirect to home if already logged in
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Grid container component='main' sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage:
                        'url(https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-1.2.1&dl=towfiqu-barbhuiya-FnA5pAzqhMM-unsplash.jpg&w=2400&q=80&fm=jpg&crop=entropy&cs=tinysrgb)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                container
                direction={'column'}
                justifyContent={'center'}
                component={Paper}
                elevation={6}
                square
            >
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        alingSelf: 'center',
                    }}
                >
                    <Typography component='h1' variant='h5'>
                        Gerenciador de Senhas
                    </Typography>
                    {children}
                    <Copyright sx={{ mt: 5 }} />
                </Box>
            </Grid>
        </Grid>
    )
}
