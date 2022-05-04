import { createTheme, ThemeProvider } from '@mui/material/styles'
import '../styles/styles.css'

const theme = createTheme({
    palette: {
        primary: {
            main: "#b2ebf2",

        },
        secondary: {
            main: "#1b243f",
        },
        error: {
            main: "#9e2b25",
        },
        warning: {
            main: "#ffc857",
        },
        info: {
            main: "#b18fcf",
        },
        success: {
            main: "#a5cc6b",
        }
    },
    components: {
        MuiTableSortLabel: {
            styleOverrides: {
                root: {
                    '&.Mui-active': {
                        color: "#d8ff9b"
                    }
                },

            }
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    color: "#1b243f",
                    '&.Mui-focused': {
                        color:"#1b243f"
                    }
                }
            }
        },
    }
})

export default function App({Component, pageProps}) {
    return (
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider> 
            )
}