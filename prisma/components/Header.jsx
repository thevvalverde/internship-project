import { Container, Paper, Typography } from "@mui/material"

export default function Header() {
    return (
            <Container sx={{height:'100%'}} maxWidth="false" disableGutters>
                <Paper elevation={1} sx={{backgroundColor:"primary.light",height:"100%", padding:"0 1%", border:"1px solid gray" }}>
                    <Typography variant="h2" sx={{fontWeight:700, fontFamily:'Roboto'}}>ConsentList</Typography>
                </Paper>
            </Container>
        )
}