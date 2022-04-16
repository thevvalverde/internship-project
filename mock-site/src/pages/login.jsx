import React, { Fragment } from "react"
import { useFormik } from "formik"
import { Button, TextField } from "@mui/material"
import {Router, useRouter} from "next/router"
import Header from "../components/Header";
import { useCookies } from "react-cookie";


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
        // props.loginFunction(data.userInfo)
        alert("this is working");
        console.log(JSON.stringify(data.userInfo));
        await logger("user", data.userInfo)
        return true
    }


}

export default function Login(props) {
    const router = useRouter();
    const [cookie, setCookie] = useCookies(["user"])


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

    const saveCookie = async (data) => {
        try {
            setCookie("user", JSON.stringify(data), {
                path: "/",
                maxAge: 3600, // Expires after 1hr
                sameSite: true,
            })
        } catch (error) {
            console.log(error);
        }
    }



    const formik = useFormik( {
            initialValues:{email: '', password:''},
            validate,
            onSubmit:async(values) => {
                const ans = await handleLogin(values, saveCookie)
                console.log("this is ans: " + ans);
                if(ans) {
                    console.log("Got here with ans " + ans);


                    // window.location.href="http://localhost:3000"
                    // router.push("/")
                    // router.reload();
                }
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
                <Button color="secondary" variant="contained" fullWidth type="submit" size="large" margin="dense">
                    Log In
                </Button>
            </form>
        </div>
    )




}
