import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Paper } from '@mui/material'
import { styled } from '@mui/system'
import '../styles/styles.css'

const theme = createTheme({
    palette: {
        primary: {
            main: "#001166",

        },
        secondary: {
            light: "#ececec",
            main: "#cacaca",
            dark: "#8c8c8c"
        },
        error: {
            main: "#AF3029",
        },
        warning: {
            main: "#ffc857",
        },
        info: {
            main: "#0ACCBC",
        },
        success: {
            main: "#0ACC79",
        },
        selected: {
            main: "#0A86C4"
        },
        hovered: {
            main: "#F8FFFE"
        }
    },
    components: {
        MuiTableSortLabel: {
            styleOverrides: {
                root: {
                    '&.Mui-active': {
                        color: "#5B0CED"
                    }
                },

            }
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    color: "#EDEDED",
                    '&.Mui-focused': {
                        color:"#EDEDED"
                    }
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "&.MuiOutlinedInput-root .MuiSelect-select ~ .MuiOutlinedInput-notchedOutline" : {
                        borderColor: "#f2f2f2"
                    },
                    "&.MuiOutlinedInput-root .MuiSelect-select ~ .MuiSvgIcon-root": {
                        color: "#f2f2f2"
                    },
                    "&.Mui-focused .MuiSelect-select ~ .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#0ACCBC"
                    },
                }
            }
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    backgroundColor: "#1b243f",
                    color: "#ffffff"
                }
            }
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    backgroundColor: "#002266",
                    "&:hover": {
                        backgroundColor:"#002C83"
                    }
                }
            }
        },
        MuiFormControlLabel: {
            styleOverrides: {
                label: {
                    color: "#ffffff"
                }
            }
        },
        MuiRadio: {
            styleOverrides: {
                root: {
                    color: "#f2f2f2"
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                formControl: {
                    color: "#f2f2f2",
                    borderColor: "#f2f2f2"
                }
            }
        }
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
    height:"10vh", 
    position:'fixed', 
    zIndex:3, 
    width:'100%',
}))

// const SelectorDiv = styled('div')(({theme}) => ({
// }))

const BackgroundPaper = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.secondary.light, 
    width:'100%', 
    minHeight:'100%',
}))

const PageBackDiv = styled('div')(({theme}) => ({
    display:'flex',
    top:'10%', 
    position:'absolute', 
    height:'90vh', 
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