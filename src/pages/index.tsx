import { NabBar } from '@/components/ui/NavBar'
import EnhancedTable from '@/components/ui/DataGrid'
import { Box, Paper } from '@mui/material'
import type { NextPage } from 'next'
import { Password, PasswordCollection } from '@/types/password.types'
import { useEffect, useState } from 'react'
import { PasswordClient } from '@/client/password.client'

const Home: NextPage = () => {
    return (
        <Paper>
            <NabBar />
            <Box component='main'>
                <EnhancedTable />
            </Box>
        </Paper>
    )
}

export default Home
