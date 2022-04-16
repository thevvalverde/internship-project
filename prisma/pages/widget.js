import { Button, Typography } from "@mui/material"
import { prisma } from "@prisma/client"
import Link from "next/link"
import { useEffect, useState } from "react"
import LaunchIcon from '@mui/icons-material/Launch'
import { ExpandMore } from "@mui/icons-material";
import { useFormik } from "formik"
import Consent from "../components/Consent"


export default function Widget() {

    const [receivedData, setReceivedData] = useState({})
    const [userInfo, setUserInfo] = useState({})
    const [consents, setConsents] = useState([])
    const [policy, setPolicy] = useState({})
    const [visible, setVisible] = useState(false)

    const collapse = () => {
        setVisible(false)
    }

    const expand = () => {
        if(JSON.stringify(receivedData)=== "{}")
            return
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
            setVisible(false)
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
        setVisible(true)

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
                    <div className={visible ? "child-container left-child" : "hidden"}>
                        <h2 className={JSON.stringify(receivedData) === "{}" ? "hidden" : "centered"}><Typography variant="h4">Consent Policy</Typography> </h2>
                        <Typography component="p">
                            {policy.policy}
                        </Typography>
                    </div>
                    <div className="separator"></div>
                    <div className={visible ? "child-container right-child" : "hidden"}>
                        <form onSubmit={formik.handleSubmit} className="form">
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
                    <Button aria-label="Open" size="large" onClick={expand} sx={{borderRadius:"20%", backgroundColor:"#0084F7"}} >
                        <LaunchIcon sx={{color: "black"}}/>
                    </Button> 
                </div>
        </div>
    ) 
}