import { prisma } from "@prisma/client"
import Link from "next/link"
import { useEffect, useState } from "react"


export default function Home() {

    const [receivedData, setReceivedData] = useState({})
    const [userInfo, setUserInfo] = useState({})
    const [consents, setConsents] = useState([])
    const [policy, setPolicy] = useState({})

    useEffect(() => {
        window.addEventListener("message", (e) => {
            if(e.origin !== "http://localhost:3000"){
                console.log("returning");
                return
            }
            console.log(e);
            // alert("window data: " + JSON.stringify(e.data, null, 2));
            // alert(e.origin)
            setReceivedData(e.data)
        })
    })

    useEffect(async() => {
        if(JSON.stringify(receivedData) === "{}") {
            setUserInfo({})            
            setConsents([])
            setPolicy({})
            return
        }

            console.log("useeffect");
            console.log(receivedData);
        // alert(JSON.stringify(receivedData))
        const response = await fetch('/api/get-subject-data', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(receivedData)
        })
        const data = await response.json()
        console.log(JSON.stringify(data))
        setUserInfo(data.user)
        setConsents(data.consents)
        setPolicy(data.policy)

    }, [receivedData])

    return <div className="main-container">
                <div className="child-container">
                    <h2 className="centered">Consent Policy</h2>
                    {policy.policy}
                </div>
                <div className="separator"></div>
                <div className="child-container">
                    {consents.map((consent) => {
                        return <h6 key={consent.consentID}>{consent.description}</h6>
                    })}
                </div>
            </div>
}