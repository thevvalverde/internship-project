import { Button, Container, Paper, Typography } from "@mui/material"
import Link from "next/link"
import { HeaderDiv } from "../pages/_app"

export default function Header() {
    return (
            <HeaderDiv>
                <Container sx={{height:'100%'}} maxWidth="false" disableGutters>
                    <Paper elevation={0} sx={{backgroundColor:"primary.light",height:"100%", padding:"0 1%", borderBottom:"1px solid gray", borderRadius:0}}>
                        <Typography variant="h2" sx={{fontWeight:700, fontFamily:'Roboto', display:'inline-block', width:"25%"}}>ConsentList</Typography>
                        <div style={{display: 'inline-block', width:"74%"}}>
                            <Link href="/">
                                <Button variant="text" color="secondary" size="large"><h3>Searcher</h3></Button>
                            </Link>
                            {' '}
                            <Link href="/editor">
                                <Button variant="text" color="secondary" size="large"><h3>Editor</h3></Button>
                            </Link>
                        </div>
                    </Paper>
                </Container>
            </HeaderDiv>
        )
}
