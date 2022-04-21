import Typography from "@mui/material/Typography"
import Checkbox from "@mui/material/Checkbox"
import React from "react"

export default function Consent({consents, formik}) {
    const builder = (individualConsent) => {
        return (
            <div key={individualConsent.id}>
                <Checkbox name="checked" value={individualConsent.id} onChange={formik.handleChange} defaultChecked={individualConsent.subjectOption}/>
                <label htmlFor={individualConsent.id}><Typography component="label" > {individualConsent.description}</Typography></label>
                {/* <input type="checkbox" name="checked" value={individualConsent.id} onChange={formik.handleChange}/> */}
            </div>
        ) 
    }
    return (
        <>
            <Typography component="h1" variant="h5">I agree to...</Typography>
            <br/>
            {consents.map(c => builder(c))}
        </>
    )
}