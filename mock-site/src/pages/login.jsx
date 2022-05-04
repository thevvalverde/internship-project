import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";

async function handleLogin(values, logger) {

    const lookup = await fetch('/api/lookup', {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(values)
    });

    const lookupRes = await lookup.json();

    if(lookupRes.found === 0) {
        alert("This email is not registered.")
        return false
    }

    const login = await fetch('/api/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
    })

    const data = await login.json()

    if(data.status === 0) {
        alert("Incorrect password.")
        return false
    } else if (data.status === -1) {
        alert("An unexpected error ocurred")
        return false
    } else {
        logger(data.userInfo)
        return true
    }


}

export default function Login({loginFunction}) {
    const validate = values => {
        const errors = {}
        if(!values.email) {
            errors.email = "Required"
        }
        if(!values.password) {
            errors.password = "Required"
        } else if(values.password.length < 3) {
            errors.password = "Must be longer than 3 digits"
        }
        return errors
    }

    const formik = useFormik( {
            initialValues:{email: '', password:''},
            validate,
            onSubmit: async (values) => {
                const ans = await handleLogin(values, loginFunction)
            }
    })


    return (
        <div className="centered" style={{paddingTop: "50px"}}>
            <form onSubmit={formik.handleSubmit} style={{width: "50%", display:"inline-block"}}>
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    variant="filled"
                    margin="dense"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && formik.errors.email}
                />
                <TextField
                    fullWidth
                    id="password"
                    type="password"
                    name="password"
                    label="Password"
                    variant="filled"
                    margin="dense"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && formik.errors.password}
                />
                <hr style={{border: "none", margin: "10px"}}/>
                <Button 
                    color="secondary" 
                    variant="contained" 
                    fullWidth 
                    type="submit" 
                    size="large" 
                    margin="dense"
                >
                    Log In
                </Button>
            </form>
        </div>
    )




}
