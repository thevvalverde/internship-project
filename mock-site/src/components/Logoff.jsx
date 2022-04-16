import { Button } from "@mui/material";
import { styled } from "@mui/system";
import React, { Fragment } from "react";
import Link from "next/link"
import { changeStatus } from "./Header";

export default function Auth(props) {

    return (
        <div>
                <div className="auth-buttons">
                        <Button variant="outlined" disableElevation color="secondary" onClick={() => {props.update(false); props.logoutFunction()}}>
                            Log off
                        </Button>
                </div>
        </div>
    )
}

