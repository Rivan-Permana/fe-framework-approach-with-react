// src/components/layouts/BaseLayout.jsx

import { Box, CssBaseline } from '@mui/material'

const BaseLayout = ({ children, title }) => {
    return (
        <>
            <CssBaseline />
            <Box sx={{ maxWidth: 960, mx: 'auto' }}>
                <Box component={'h1'}>{title}</Box>
                <Box>{children}</Box>
            </Box>
        </>
    )
}

export default BaseLayout