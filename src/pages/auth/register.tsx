import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Layout } from '@/components/accounts'
import UserService from '@/services/user.service'
import { FormRegister } from '@/types/auth.types'
import { useRouter } from 'next/router'

export default function Register() {
    const router = useRouter()
    const [registerUser, setRegisterUser] = React.useState<FormRegister>({
        name: '',
        username: '',
        email: '',
        password: '',
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(registerUser)
        if (registerUser) {
            UserService.login(registerUser).then(() => {
                router.push('/auth/login')
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
                    id='name'
                    label='Nome Completo'
                    name='name'
                    autoComplete='fname'
                    value={registerUser.name}
                    onChange={(e) => setRegisterUser({ ...registerUser, name: e.target.value })}
                    autoFocus
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    label='E-mail'
                    name='email'
                    autoComplete='email'
                    value={registerUser.email}
                    onChange={(e) => setRegisterUser({ ...registerUser, email: e.target.value })}
                    autoFocus
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='username'
                    label='Usuário'
                    name='username'
                    value={registerUser.username}
                    onChange={(e) => setRegisterUser({ ...registerUser, username: e.target.value })}
                    autoComplete='fname'
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    name='password'
                    label='Senha'
                    type='password'
                    id='password'
                    value={registerUser.password}
                    onChange={(e) => setRegisterUser({ ...registerUser, password: e.target.value })}
                    autoComplete='current-password'
                />
                <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                    Registrar
                </Button>
                <Grid container>
                    <Grid item>
                        <Link href='/auth/login' variant='body2'>
                            Já possui uma conta? Faço o Login
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    )
}
