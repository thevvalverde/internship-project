import { Button } from "@mui/material"
import { prisma } from "@prisma/client"
import Link from "next/link"
import { useEffect, useState } from "react"
import LaunchIcon from '@mui/icons-material/Launch'
import { ExpandMore } from "@mui/icons-material";
import { useFormik } from "formik"
import Consent from "../components/Consent"


export default function Home() {

    const [receivedData, setReceivedData] = useState({})
    const [userInfo, setUserInfo] = useState({})
    const [consents, setConsents] = useState([])
    const [policy, setPolicy] = useState({})
    const [visible, setVisible] = useState(true)

    const collapse = () => {
        setVisible(false)
    }

    const expand = () => {
        setVisible(true)
    }

    useEffect(() => {
        window.addEventListener("message", (e) => {
            if(e.origin === "http://localhost:3000"){
                setReceivedData(e.data)
            }
        })
    },[])

    useEffect(async() => {
        if(JSON.stringify(receivedData) === "{}") {
            setUserInfo({})            
            setConsents([])
            setPolicy({})
            return
        }
        const response = await fetch('/api/get-subject-data', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(receivedData)
        })
        const data = await response.json()
        setUserInfo(data.user)
        setConsents(data.consents)
        setPolicy(data.policy)

    }, [receivedData])

    const formik = useFormik({
        initialValues: {},
        onSubmit: async (values) => {
            const allConsents = consents.map(c => c.id)
            const givenConsents = values.checked.map(c => parseInt(c))

            const data = {allConsents, givenConsents, userInfo}

            // alert(JSON.stringify(data, null, 2))

            setVisible(false) 

            const response = await fetch('/api/update-subject-data', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const responseJson = await response.json()
            alert(JSON.stringify(responseJson, null, 2))
        },
    })

    return (
        <div>
                <div className={visible ? "main-container" : "hidden"}>
                    <div className="child-container">
                        <h2 className={JSON.stringify(receivedData) === "{}" ? "hidden" : "centered"}>Consent Policy</h2>
                        {policy.policy}
                    </div>
                    <div className="separator"></div>
                    <div className="child-container">
                        <form onSubmit={formik.handleSubmit}>
                            <Consent consents={consents} formik={formik} />
                            <div className={JSON.stringify(receivedData) === "{}" ? "hidden" : "form-submit-button"}>
                                <Button variant="contained" type="submit">Submit</Button>
                            </div>
                        </form>
                    </div>
                    <div className="close-button">
                        <Button aria-label="Close" size="large" onClick={collapse} >
                            <ExpandMore/>
                        </Button>
                    </div>
                </div>
                <div className={visible ? "hidden" : "open-button"}>
                    <Button aria-label="Open" size="large" onClick={expand} sx={{borderRadius:"100%", backgroundColor:"yellow"}} >
                        <LaunchIcon />
                    </Button> 
                </div>
        </div>
    ) 
}