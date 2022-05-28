import { TextField } from "@mui/material";
import { useState } from "react";

export default function MyTextField({content, label, readonly, ml, consentHandler,handler}) {

    // let [val, setVal] = useState("")

    // function handleChange(event) {
    //     setVal(event.target.value)
    // }

    return <TextField 
                value={content}
                label={label}
                onChange={consentHandler || handler}
                color="primary"
                variant="standard" 
                margin="dense"
                fullWidth
                multiline = {ml}
                InputProps={{
                    readOnly: readonly ? true : false,
                }}
                sx={{padding: '4px', borderRadius:1, backgroundColor:'secondary.main', input: {color: 'secondary.contrastText'}, label: {color: 'info.dark', padding:'3px'}, textarea: {color: 'secondary.contrastText'}}}
            />
}