import React, { useRef, useState } from "react";
import Header from "./Header";
import MyIframe from "./MyIframe";
import data from "./data"
import Script from "next/script";
import { parseCookies } from "../pages/helper";

export default function Layout({data, children}) {

    const [auth, setAuth] = useState(false); 
    const [token, setToken] = useState({});
    const iFrameRef = useRef(null);
    const origin = "http://localhost:3030"


    function ChildComponent({children}) {
        return (
            <>
                {React.cloneElement(children, {update: setAuth, auth: auth, loginFunction: passUserInfo, token: token, saveToken: setToken})}
            </>
        )
    }
    const passUserInfo = (userInfo) => {
        if(!iFrameRef.current)
            return;
        // console.log("got here");
        // alert(JSON.stringify(values, null, 2))
        const sendData = {userInfo, data}

        iFrameRef.current.contentWindow.postMessage(sendData, origin)
    }

    const removeUserInfo = () => {
        if(!iFrameRef.current)
            return;
        iFrameRef.current.contentWindow.postMessage({}, origin)
    }

    let request = {...token, "org-reference": 2}

    return (
        <div>
            <Header status={auth} update={setAuth} logoutFunction={removeUserInfo}/>
            <div className="main-body centered" id="root">
                {ChildComponent({children})}
            </div>
            {/* <Script src="https://unpkg.com/react@18/umd/react.development.js" crossOrigin/> */}
            {/* <Script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossOrigin/> */}
            <Script src="http://localhost:3010/script.js" type="text/babel" crossOrigin tokens={JSON.stringify(request)}/>
            {/* <script src="http;//localhost:3010/script.js" crossOrigin="true" tokens={JSON.stringify(request)}></script> */}
            {/* <MyIframe auth={auth} ifref={iFrameRef}/> */}
        </div>
    )
}
