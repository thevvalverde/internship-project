import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

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
