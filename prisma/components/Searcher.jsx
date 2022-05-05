
import { Button, Container, Paper, TextField, Typography } from "@mui/material"
import MyFilter from "../components/MyFilter"
import SelectorContainer from "./SelectorContainer"

export default function Searcher({updateRef, orgRef, fetchData, available, subjects, sub, handleSetSub, opt, handleSetOpt, resetFilter}) {
    return (
        <SelectorContainer>
                <Typography variant="caption" sx={{fontSize:18}} gutterBottom>
                    Enter your organization reference:
                </Typography>
                <br/>
                <br/>

                <TextField 
                    sx={{width:"100%"}} 
                    onChange={updateRef} 
                    id="organization-reference" 
                    label="Organization Reference" 
                    variant="filled" 
                    value={orgRef} 
                    color="secondary"
                />

                <Button sx={{width:"100%", margin:"10px 0"}} variant="contained" color='info' onClick={fetchData}>
                    Search
                </Button>

                {available  ? (<MyFilter 
                                    subjects={subjects} 
                                    sub={sub} 
                                    handleSetSub={handleSetSub} 
                                    opt={opt} 
                                    handleSetOpt={handleSetOpt}  
                                    resetFilter={resetFilter}
                                />) 
                            : null}

        </SelectorContainer>
    )
}