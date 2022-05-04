import { Button } from "@mui/material";
import React from "react";

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

