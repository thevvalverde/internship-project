import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Paper } from '@mui/material'
import { styled } from '@mui/system'
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

const ContentDiv = styled('div')(({theme}) => ({
    flex:3, 
    overflow:'auto', 
    padding:'0',
}))

const SelectorDiv = styled('div')(({theme}) => ({
    flex:1, 
    // height: '100%',
}))

const HeaderDiv = styled('div')(({theme}) => ({
    height:"12vh", 
    position:'fixed', 
    zIndex:3, 
    width:'100%',
}))

// const SelectorDiv = styled('div')(({theme}) => ({
// }))

const BackgroundPaper = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.secondary.main, 
    width:'100%', 
    minHeight:'100%',
}))

const PageBackDiv = styled('div')(({theme}) => ({
    display:'flex',
    top:'12%', 
    position:'absolute', 
    height:'88vh', 
    width:'100%',
}))

export default function App({Component, pageProps}) {
    return (
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider> 
            )
}

export {ContentDiv, SelectorDiv, HeaderDiv, BackgroundPaper, PageBackDiv}