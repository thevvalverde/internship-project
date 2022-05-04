import { Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material"
import React from "react"

export default function Consent({consents, formik}) {
    return (
        <>
            <Typography component="h1" variant="h5">I agree to...</Typography>
            <br/>
            {consents.map((c,i) => (
                <FormGroup key={i}>
                    <FormControlLabel control={<Checkbox name={c.id} onChange={formik.handleChange} defaultChecked={c.subjectOption}/>} label={c.description}/>
                </FormGroup>
            ))}
        </>
    )
}