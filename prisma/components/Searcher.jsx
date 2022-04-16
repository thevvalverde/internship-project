
import { Button, Container, Paper, TextField, Typography } from "@mui/material"

export default function Searcher({updateRef, orgRef, fetchData}) {
    return (
        <Container sx={{ left:0, top:'12%', height:'100%'}} disableGutters>
            <Paper elevation={0} sx={{height:"97%", backgroundColor:"primary.light", padding:"2%", textAlign:"left", borderTop:"1px solid gray"}}>

                <Typography variant="h5" sx={{textAlign:"left", fontFamily:'Roboto'}}>Enter your organization reference:</Typography>

                <br/>

                <TextField sx={{width:"100%"}} onChange={updateRef} id="organization-reference" label="Organization Reference" variant="filled" value={orgRef} color="secondary"/>

                <Button sx={{width:"100%", margin:"10px 0"}} variant="contained" color='info' onClick={fetchData}>Search</Button>

            </Paper>
        </Container>
    )
}