import { NabBar } from '@/components/ui/NavBar'
import EnhancedTable from '@/components/ui/DataGrid'
import { Box, Paper } from '@mui/material'
import type { NextPage } from 'next'

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
