import { Container, Paper } from "@mui/material"

export default function SelectorContainer({children}) {
    return (
        <Container sx={{ left:0, top:'10%', height:'100%', position:'fixed', width:'25%'}} disableGutters>
            <Paper elevation={0} sx={{height:"97%", backgroundColor:"primary.dark", padding:"6%", textAlign:"left", borderRadius:0}}>
                {children}
            </Paper>
        </Container>
    )
}