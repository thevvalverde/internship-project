import { Button, Container, Paper, Typography } from "@mui/material"
import Link from "next/link"
import { HeaderDiv } from "../pages/_app"

export default function Header({active}) {
    return (
            <HeaderDiv>
                <Container sx={{height:'100%', display:"relative"}} maxWidth="false" disableGutters>
                    <Paper elevation={0} sx={{backgroundColor:"primary.dark",height:"100%",borderBottom:"1px solid", borderColor:"primary.light", borderRadius:0, padding:"0 1%"}}>
                        <Typography variant="h2" sx={{fontWeight:700,display:'inline-block', width:"25%", fontSize:55}} color="secondary">BackOffice</Typography>
                        <div style={{display: 'inline-block', width:"auto",height:"100%", float:"right", paddingRight:"1%"}}>
                            <Link href="/">
                                <Button variant="text" color={active===0 ? "info" : "secondary"} size="large"><h3>Org Searcher</h3></Button>
                            </Link>
                            {' '}
                            <Link href="/editor">
                                <Button variant="text" color={active===1 ? "info" : "secondary"} size="large"><h3>Org Editor</h3></Button>
                            </Link>
                            {' '}
                            <Link href="/user-editor">
                                <Button variant="text" color={active===2 ? "info" : "secondary"} size="large"><h3>User Consents</h3></Button>
                            </Link>
                        </div>
                    </Paper>
                </Container>
            </HeaderDiv>
        )
}
