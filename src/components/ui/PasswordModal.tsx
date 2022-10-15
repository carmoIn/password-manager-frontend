import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField'
import { Backdrop, Box, CircularProgress, Container } from '@mui/material'
import { ApiLink } from '@/types/api-link.types'
import { useEffect, useState } from 'react'
import { ModalProp } from '@/interfaces/modal.interface'
import { PasswordClient } from '@/client/password.client'
import { Password } from '@/types/password.types'

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

    useEffect(() => {
        if (show.edited != null) {
            new PasswordClient().get(show.edited).then((password) => {
                console.log('chamou')
                setItem(password)
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
                new PasswordClient().updateEntity({ href: show.edited }, item).then((password) => {
                    setItem(password)
                    setLoading(false)
                    setOpen({ open: false, edited: password._links.self.href })
                })
            } else {
                new PasswordClient().createEntity(item).then((password) => {
                    setItem(password)
                    setLoading(false)
                    setOpen({ open: false, edited: password._links.self.href })
                })
            }
        }
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
                                type='password'
                                id='password'
                                autoComplete='current-password'
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
