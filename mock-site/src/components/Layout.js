import Script from "next/script";
import React, { useRef, useState } from "react";
import Header from "./Header";
import cookie from "js-cookie";
// import data from "./data";

export default function Layout({children}) {

    let userToken = cookie.get("token")
    let userEmail = cookie.get("email")
    let orgRef = cookie.get("org")

    const [auth, setAuth] = useState(userToken != undefined); 
    const [org, setOrg] = useState((orgRef == undefined ? 2 : orgRef))
    
    function ChildComponent({children}) {
        return (
            <>
                {React.cloneElement(children, {loginFunction: passUserInfo})}
            </>
        )
    }
    const passUserInfo = (userInfo) => {
        cookie.set("token", userInfo.id, { expires: 1/24 })
        cookie.set("email", userInfo.email, {expires: 1/24})
        window.location.href="http://localhost:3000"
    }

    const removeUserInfo = () => {
        cookie.remove("token")
        cookie.remove("email")
        window.location.href="http://localhost:3000"
    }

    const handleSetOrg = (e) => {
        cookie.set("org", e.target.value)
        setOrg(e.target.value)
    }

    return (
        <div>
            <Header status={auth} update={setAuth} logoutFunction={removeUserInfo} org={org} setOrg={handleSetOrg}/>
            <div className="main-body centered" id="root">
                {ChildComponent({children})}
            </div>
            <Script src="http://localhost:3030/mainscript.js" crossOrigin data-useremail={userEmail == undefined ? "" : userEmail} data-orgref={org} id="tek-script"/>
        </div>
    )
}
