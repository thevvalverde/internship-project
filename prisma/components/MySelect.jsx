import { Container, FormControl, InputLabel, MenuItem, Paper, Select, Typography, Button } from "@mui/material";
import SelectorContainer from "./SelectorContainer";
import UserFilter from "./UserFilter"

export default function MySelect({items, value, setter, creator, mode, available, organizations, org, handleSetOrg, opt, handleSetOpt, resetFilter}) {
    return(
            <SelectorContainer>

                <Typography variant="caption" sx={{fontSize:18}} color="secondary">
                    Select the {mode}:
                </Typography>

                <br/>
                <br/>

                <FormControl fullWidth color="secondary">
                    <InputLabel id="items-list">{`${mode[0].toUpperCase()}${mode.slice(1)}`}</InputLabel>
                    <Select
                        variant="filled"
                        labelId="items-list"
                        id="org-list"
                        value={value}
                        onChange={setter}
                    >
                        {items.map((element) => (
                            <MenuItem value={element.id} key={element.id}>{element.name ? element.name : element.email}</MenuItem>
                        ))}
                    </Select>

                    {mode === "organization"    ?   <Button sx={{width:"100%", margin:"10px 0"}} variant="contained" color='info' onClick={creator}>
                                                        Create new
                                                    </Button>
                                                :   null}
                    
                    {available  ?  (<UserFilter 
                                    organizations={organizations} 
                                    org={org} 
                                    handleSetOrg={handleSetOrg} 
                                    opt={opt} 
                                    handleSetOpt={handleSetOpt}  
                                    resetFilter={resetFilter}
                                />)
                                : null}

                </FormControl>

            </SelectorContainer>
    )
}