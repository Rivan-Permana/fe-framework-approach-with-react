// src/App.jsx

import { DetailProducts, Products } from './components/pages/products'
import { ThemeProvider, createTheme } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router'

const theme = createTheme ({
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
        ].join(',')
    }
})

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Products />} />
                    <Route path="/detail/:id" element={<DetailProducts />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App