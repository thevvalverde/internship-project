import { Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Typography } from "@mui/material";
import { useState } from "react";

export default function MyFilter({subjects, sub, handleSetSub, opt, handleSetOpt, resetFilter}) {




    return(
        <>
            <hr/>
            <Typography variant="h4">Filters</Typography>
            <br/>
            <FormControl fullWidth>
                <InputLabel id="subject-filter">Subject</InputLabel>
                <Select
                    labelId="subject-filter"
                    id="sub-filter"
                    value={sub}
                    label="Subject"
                    onChange={handleSetSub}
                >
                    <MenuItem value={0}>None</MenuItem>
                    {subjects.map((element) => (
                        <MenuItem value={element.id}>{element.email}</MenuItem>
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
                    <FormControlLabel value={0} control={<Radio/>} label="Any"/>
                    <FormControlLabel value={1} control={<Radio/>} label="Agreed"/>
                    <FormControlLabel value={2} control={<Radio/>} label="Disagreed"/>
                </RadioGroup>
                <br/>
                <Button 
                    onClick={resetFilter}
                    variant="contained"
                    color="secondary"
                >Reset Filters</Button>
            </FormControl>
        </>
    )
}