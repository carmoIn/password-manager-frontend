import { NabBar } from '@/components/ui/NavBar'
import EnhancedTable from '@/components/ui/DataGrid'
import { Box, Paper } from '@mui/material'
import type { NextPage } from 'next'
import { Password, PasswordCollection } from '@/types/password.types'
import { useEffect, useState } from 'react'
import { PasswordClient } from '@/client/password.client'

const Home: NextPage = () => {
    const [passwordList, setPasswordList] = useState<PasswordCollection>()

    useEffect(() => {
        loadPasswordList()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function loadPasswordList() {
        new PasswordClient().list().then((passwords) => {
            setPasswordList(passwords)
        })
    }

    return (
        <Paper>
            <NabBar />
            <Box component='main'>
                <EnhancedTable rows={passwordList?._embedded.passwords || new Array<Password>()} />
            </Box>
        </Paper>
    )
}

export default Home
