import { NabBar } from '@/components/ui/NavBar'
import EnhancedTable from '@/components/ui/DataGrid'
import { Box, Paper } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
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
