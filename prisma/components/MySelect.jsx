import { Container, FormControl, InputLabel, MenuItem, Paper, Select, Typography, Button } from "@mui/material";
import SelectorContainer from "./SelectorContainer";

export default function MySelect({organizations, value, setter, creator}) {
    return(
            <SelectorContainer>

                <Typography variant="caption" sx={{fontSize:18}}>
                    Select the organization:
                </Typography>

                <br/>
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
                            <MenuItem value={element.id} key={element.id}>{element.name}</MenuItem>
                        ))}
                    </Select>

                    <Button sx={{width:"100%", margin:"10px 0"}} variant="contained" color='success' onClick={creator}>
                        Create new
                    </Button>

                </FormControl>

            </SelectorContainer>
    )
}