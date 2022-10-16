import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import TextField from '@mui/material/TextField'
import { Backdrop, Box, CircularProgress, Container, InputAdornment } from '@mui/material'
import { useEffect, useState } from 'react'
import { ModalProp } from '@/interfaces/modal.interface'
import { Password } from '@/types/password.types'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import PasswordService from '@/services/password.service'

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction='up' ref={ref} {...props} />
})

interface Props {
    show: ModalProp
    setOpen: (prop: ModalProp) => void
}

export default function PasswordModal({ show, setOpen }: Props) {
    const [loading, setLoading] = useState<boolean>(true)
    const [item, setItem] = useState<Password>(() => new Password())
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        if (show.edited != null) {
            PasswordService.get({ href: show.edited }).then((response) => {
                response.password = atob(response.password)
                console.log('chamou')
                setItem(response)
                setLoading(false)
            })
        } else {
            setItem(() => new Password())
            setLoading(false)
        }
    }, [show])

    const handleClose = () => {
        setOpen({ open: false, edited: null })
    }

    const handleSubmit = () => {
        setLoading(true)
        if (item) {
            item.user = '/2'
            item.password = btoa(item.password)

            if (show.edited) {
                PasswordService.update({ href: show.edited }, item).then((response) => {
                    setItem(response)
                    setLoading(false)
                    setOpen({ open: false, edited: response._links.self.href })
                })
            } else {
                PasswordService.create(item).then((response) => {
                    setItem(response)
                    setLoading(false)
                    setOpen({ open: false, edited: response._links.self.href })
                })
            }
        }
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const onModalChange = (prop: ModalProp): void => {
        console.log('testando retorno ' + prop.open + ' ' + prop.edited)
    }
    setOpen.bind(onModalChange)

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color='inherit' />
            </Backdrop>
            <Dialog
                fullScreen
                open={show.open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge='start'
                            color='inherit'
                            onClick={handleClose}
                            aria-label='close'
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
                            Senha
                        </Typography>
                        <Button autoFocus color='inherit' onClick={handleSubmit}>
                            Salvar
                        </Button>
                    </Toolbar>
                </AppBar>
                <Container component='main' maxWidth='xs'>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component='h1' variant='h5'>
                            {show.edited ? 'Editando ' + item.name : 'Nova Senha'}
                        </Typography>
                        <Box component='form' noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                id='name'
                                label='Nome do Site'
                                name='name'
                                value={item.name}
                                onChange={(e) =>
                                    setItem({ ...item, name: e.target.value } as Password)
                                }
                                autoFocus
                            />
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                id='site'
                                label='Endereço do Site'
                                name='site'
                                autoComplete='site'
                                value={item.site}
                                onChange={(e) =>
                                    setItem({ ...item, site: e.target.value } as Password)
                                }
                                autoFocus
                            />
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                name='password'
                                label='Senha'
                                type={showPassword ? 'text' : 'password'}
                                id='password'
                                autoComplete='current-password'
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label='toggle password visibility'
                                                onClick={handleClickShowPassword}
                                                edge='end'
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                value={item.password}
                                onChange={(e) =>
                                    setItem({ ...item, password: e.target.value } as Password)
                                }
                            />
                        </Box>
                    </Box>
                </Container>
            </Dialog>
        </div>
    )
}
