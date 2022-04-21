import Script from "next/script";
import React, { useRef, useState } from "react";
import data from "./data";
import Header from "./Header";
import cookie from "js-cookie";

export default function Layout({children}) {

    let userToken = cookie.get("token")
    let userEmail = cookie.get("email")

    const [auth, setAuth] = useState(userToken != undefined); 
    
    // const origin = "http://localhost:3030"
    // const iFrameRef = useRef(null);

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
        // if(!iFrameRef.current)
        //     return;
        // const sendData = {userInfo, data}
        // iFrameRef.current.contentWindow.postMessage(sendData, origin)
    }

    const removeUserInfo = () => {
        cookie.remove("token")
        cookie.remove("email")
        window.location.href="http://localhost:3000"
        // if(!iFrameRef.current)
            // return;
        // iFrameRef.current.contentWindow.postMessage({}, origin)
    }

    // let request = {...token, "org-reference": 2}

    // let mockuinfo = {
    //     createdAt: "1900-01-30T19:09:57.420Z",
    //     email: "bob@test.com",
    //     hashpass: 123,
    //     id: 23
    // }


    return (
        <div>
            <Header status={auth} update={setAuth} logoutFunction={removeUserInfo}/>
            <div className="main-body centered" id="root">
                {ChildComponent({children})}
            </div>
            <Script src="http://localhost:3030/mainscript.js" crossOrigin data-usertoken={userToken == undefined ? 0 : userToken} data-useremail={userEmail == undefined ? "" : userEmail} data-defaultdata={JSON.stringify(data)} id="tek-script"/>
            {/* <MyIframe auth={auth} ifref={iFrameRef}/> */}
        </div>
    )
}
