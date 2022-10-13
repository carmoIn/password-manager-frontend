import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Layout } from '@/components/accounts'
import UserService from '@/services/user.service'
import { FormLogin } from '@/types/auth.types'
import { useRouter } from 'next/router'

export default function Login() {
    const router = useRouter()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        console.log({
            email: data.get('username'),
            password: data.get('password'),
        })
        if (data.get('username') && data.get('password')) {
            const userLogin: FormLogin = {
                username: data.get('username') as string,
                password: data.get('password') as string,
            }

            UserService.login(userLogin).then(() => {
                const returnUrl = router.query.returnUrl || '/'
                router.push(returnUrl.toString())
            })
        }
    }

    return (
        <Layout>
            <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='username'
                    label='Usuário'
                    name='username'
                    autoComplete='fname'
                    autoFocus
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='current-password'
                />
                <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                    Login
                </Button>
                <Grid container>
                    <Grid item>
                        <Link href='/auth/register' variant='body2'>
                            Não possui uma conta? Registre-se
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    )
}
