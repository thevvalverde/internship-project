import { Button } from "@mui/material";
import { styled } from "@mui/system";
import React, { Fragment } from "react";
import Link from "next/link"

export default function Auth() {

    return (
        <div>
                <div className="auth-buttons">
                    <Link href="/login">
                        <Button variant="contained" disableElevation color="secondary">
                            Log In
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button variant="outlined" disableElevation color="secondary" >
                            Register
                        </Button>
                    </Link>
                </div>
        </div>
    )
}
