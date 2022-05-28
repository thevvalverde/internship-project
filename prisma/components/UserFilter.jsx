import { Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Typography } from "@mui/material";
import { useState } from "react";

export default function UserFilter({organizations, org, handleSetOrg, opt, handleSetOpt, resetFilter}) {

    return(
        <>
            <hr style={{width:'100%', marginTop:20}}/>
            <Typography variant="h4" color="secondary">Filters</Typography>
            <br/>
            <FormControl fullWidth>
                <InputLabel id="organization-filter">Organization</InputLabel>
                <Select
                    labelId="organization-filter"
                    id="org-filter"
                    value={org}
                    label="organization"
                    onChange={handleSetOrg}
                >
                    <MenuItem value={0}>None</MenuItem>
                    {organizations.map((element) => (
                        <MenuItem value={element.id}>{element.name}</MenuItem>
                    ))}
                </Select>
                <br/>
                <FormLabel id="option-filter">Option</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="option-filter"
                    name="radio-option-filter"
                    value={opt}
                    onChange={handleSetOpt}
                >
                    <FormControlLabel value={0} control={<Radio color="info"/>} label="Any"/>
                    <FormControlLabel value={1} control={<Radio color="info"/>} label="Agreed"/>
                    <FormControlLabel value={2} control={<Radio color="info"/>} label="Disagreed"/>
                </RadioGroup>
                <br/>
                <Button 
                    onClick={resetFilter}
                    variant="contained"
                    color="info"
                >Reset Filters</Button>
            </FormControl>
        </>
    )
}