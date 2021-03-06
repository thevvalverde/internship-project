import cookie from "js-cookie";
import Script from "next/script";
import React, { useState } from "react";
import Header from "./Header";

export default function Layout({children}) {

    let userToken = cookie.get("token")
    let userEmail = cookie.get("email")
    let orgRef = cookie.get("org")

    const [auth, setAuth] = useState(userToken !== undefined); 
    const [org, setOrg] = useState((orgRef === undefined ? 2 : orgRef))
    
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
        window.location.href="https://tp-mock-site.herokuapp.com"
    }

    const removeUserInfo = () => {
        cookie.remove("token")
        cookie.remove("email")
        window.location.href="https://tp-mock-site.herokuapp.com"
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
            <Script src="https://tp-back-office.herokuapp.com/mainscript.js" crossOrigin="anonymous" data-useremail={userEmail === undefined ? "" : userEmail} data-orgref={org} id="tek-script"/>
        </div>
    )
}
