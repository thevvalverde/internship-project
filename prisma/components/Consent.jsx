import { Checkbox } from "@mui/material"
import React from "react"

export default function Consent({consents, formik}) {
    const builder = (individualConsent) => {
        return (
            <div key={individualConsent.id}>
                <Checkbox name="checked" value={individualConsent.id} onChange={formik.handleChange}/>
                <label htmlFor={individualConsent.id}>{individualConsent.description}</label>
                {/* <input type="checkbox" name="checked" value={individualConsent.id} onChange={formik.handleChange}/> */}
            </div>
        ) 
    }
    return (
        <>
            {consents.map(c => builder(c))}
        </>
    )
}