import React, { useRef, useState } from "react";
import Header from "./Header";
import MyIframe from "./MyIframe";
import data from "./data"
import Script from "next/script";
import { parseCookies } from "../pages/helper";
import { userInfo } from "os";

export default function Layout({children}) {

    const [auth, setAuth] = useState(false); 
    const [token, setToken] = useState(0);
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
        setToken(userInfo.id)
        if(!iFrameRef.current)
            return;
        const sendData = {userInfo, data}

        iFrameRef.current.contentWindow.postMessage(sendData, origin)
    }

    const removeUserInfo = () => {
        setToken(0)
        if(!iFrameRef.current)
            return;
        iFrameRef.current.contentWindow.postMessage({}, origin)
    }

    let request = {...token, "org-reference": 2}

    return (
        <div>
            <Header status={auth} update={setAuth} logoutFunction={removeUserInfo}/>
            <div className="main-body centered" id="root" data-userid={token}>
                {ChildComponent({children})}
            </div>
            {/* <Script src="https://unpkg.com/react@18/umd/react.development.js" crossOrigin/> */}
            {/* <Script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossOrigin/> */}
            <Script src="http://localhost:3030/mainscript.js" crossOrigin data-userid={token} id="tek-script"/>
            {/* <script src="http;//localhost:3030/mainscript.js" crossOrigin="true"></script> */}
            {/* <MyIframe auth={auth} ifref={iFrameRef}/> */}
        </div>
    )
}

export async function getStaticProps() {
    return {
        revalidate: 1,
    }
}
