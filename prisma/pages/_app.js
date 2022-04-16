import { createTheme, ThemeProvider } from '@mui/material/styles'
import '../styles/styles.css'

const theme = createTheme({
    palette: {
        primary: {
            light: "#e5ffff",
            main: "#b2ebf2",
            dark: "#81b9bf",
            contrastText: "#000000",
        },
        secondary: {
            light: "#454c6a",
            main: "#1b243f",
            dark: "#00001a",
            contrastText: "#ffffff",
        },
        error: {
            light: "#d55b4e",
            main: "#9e2b25",
            dark: "#690000",
            contrastText: "#ffffff",
        },
        warning: {
            light: "#fffb88",
            main: "#ffc857",
            dark: "#c89825",
            contrastText: "#000000",
        },
        info: {
            light: "#e4bfff",
            main: "#b18fcf",
            dark: "#81619e",
            contrastText: "#000000",
        },
        success: {
            light: "#d8ff9b",
            main: "#a5cc6b",
            dark: "#749b3d",
            contrastText: "#000000",
        }
    }
})

export default function App({Component, pageProps}) {
    return (
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider> 
            )
}