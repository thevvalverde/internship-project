import { Checkbox, Typography } from "@mui/material"
import { Field } from "formik"
import React from "react"

export default function Consent({consents, formik}) {
    return (
        <>
            <Typography component="h1" variant="h5">I agree to...</Typography>
            <br/>
            {consents.map((c,i) => (
                <div key={i}>
                    <Checkbox name={c.id} onChange={formik.handleChange} defaultChecked={c.subjectOption} />
                    <label htmlFor={c.id}>{c.description}</label>
                </div>
            ))}
        </>
    )
}