import React, { useState, useEffect } from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material"
import { style, styled } from "@mui/system";
import About from "../pages/about-us";
import Contact from "../pages/contact";
import More from "../pages/see-more";
import Auth from "./Auth";
import Logoff from "./Logoff"
import Link from "next/link";
// import "../styles/styles.css"

const MyAppBar = styled(AppBar)({
    backgroundColor: "#79BCB8",
    boxShadow: "none",
    height: "100px",
    paddingRight: "80px",
    paddingLeft: "120px",
    position: "relative"
})

const MyTypography = styled(Typography)({
    color: "#FFFEFE",
    textAlign: "left",
    marginTop: "10px",
    fontWeight: 500
})

const MyButton = styled(Button)({
    color: "inherit",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
    marginTop: "10px"
})
const MyToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between"
})

const headerData = [
    {
        label: "About Us",
        href: "/about-us",
    },
    {
        label: "Contact",
        href: "/contact",
    },
    {
        label: "See More",
        href: "/see-more",
    }
]

let auth = false;




export default function Header(props) {
    const getButtons = () => {
        return headerData.map(({label, href})=> {
            return (
                <Link href={href} key={label} >
                <MyButton>
                    {label}
                </MyButton>
                </Link>
            )
        })
    }
    
    return (
            <MyAppBar>
                    <MyToolbar>
                        <MyTypography variant="h2" component="h1">
                            <Link href="/"><a className="logo">eXample</a></Link>
                        </MyTypography>
                        <div>
                            {getButtons()}
                        </div>
                        {props.status ?  <Logoff update={props.update} logoutFunction={props.logoutFunction}/> : <Auth/> }
                    </MyToolbar>
            </MyAppBar>
    )
}
