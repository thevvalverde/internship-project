import { Container, FormControl, InputLabel, MenuItem, Paper, Select, Typography, Button } from "@mui/material";

export default function MySelect({organizations, value, setter}) {
    return(
        <Container sx={{ left:0, top:'12%', height:'100%', position:'fixed', width:'25%'}} disableGutters>
            <Paper elevation={0} sx={{height:"97%", backgroundColor:"primary.light", padding:"2%", textAlign:"left", borderTop:"1px solid gray"}}>
                <Typography variant="h5" sx={{textAlign:"left", fontFamily:'Roboto'}}>Select the organization:</Typography>
                <br/>
                <FormControl fullWidth>
                    <InputLabel id="organizations-list">Organization</InputLabel>
                    <Select
                        variant="filled"
                        labelId="organizations-list"
                        id="org-list"
                        value={value}
                        label="Organization"
                        onChange={setter}
                    >
                        {organizations.map((element) => (
                            <MenuItem value={element.id}>{element.name}</MenuItem>
                        ))}
                    </Select>
                    <Button sx={{width:"100%", margin:"10px 0"}} variant="contained" color='success'>Create new</Button>
                </FormControl>
            </Paper>
        </Container>
    )
}