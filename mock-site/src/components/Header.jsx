import { AppBar, Button, FormControl, MenuItem, Select, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Auth from "./Auth";
import Logoff from "./Logoff";

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


export default function Header(props) {

    const [orgs, setOrgs] = useState([])

    useEffect(() => {
        const asyncFetchAndSet = async() => {
            const res = await fetch('https://tp-back-office.herokuapp.com/api/get-org-defaults')
            const data = await res.json()
            setOrgs(data.organizations)
        }
        asyncFetchAndSet()
    }, [])

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
                            <Link href="/"><a className="logo" href="/">eXample {props.org}</a></Link>
                        </MyTypography>
                        <div>
                            <FormControl>
                                <Select
                                    id="org-select"
                                    value={props.org}
                                    label="Org"
                                    onChange={props.setOrg}
                                >
                                    {orgs.map(o => (
                                        <MenuItem key={o.id} value={o.id}>{o.id}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {getButtons()}
                        </div>
                        {props.status ?  <Logoff update={props.update} logoutFunction={props.logoutFunction}/> : <Auth/> }
                    </MyToolbar>
            </MyAppBar>
    )
}
