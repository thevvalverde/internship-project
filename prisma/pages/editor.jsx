import Header from "../components/Header"
import MySelect from "../components/MySelect"
import OrgInfo from "../components/OrgInfo"
import NewOrg from "../components/NewOrg"
import { Paper } from "@mui/material"
import { useState } from "react"
import { useEffect } from "react"

export default function Editor({data}) {
    const [org, setOrg] = useState(0)
    const [orgInfo, setOrgInfo] = useState({})
    const [orgs, setOrgs] = useState(data.organizations)

    const handleSetOrg = (event) => {
        setOrg(event.target.value);
    }

    const createNewOrg = () => {
        setOrg(-1)
    }

    const finishCreation = (id) => {
        setOrg(id)
    }

    const updateOrgs = async() => {
        const res = await fetch('/api/get-org-defaults')
        const data = await res.json()
        setOrgs(data.organizations)

    }

    useEffect(async () => {
        const response = await fetch('/api/get-default-consents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({orgRef: org})
        })
        const data = await response.json()
        setOrgInfo(data);
    }, [org])

    return (
        <Paper sx={{backgroundColor:'secondary.main', width:'100%', minHeight:'100%'}}>
            <div style={{height:"12vh", position:'fixed', zIndex:3, width:'100%'}}>
                <Header/>
            </div>
            <div style={{display:'flex', top:'12%', position:'absolute', height:'88vh', width:'100%'}}>
                <div style={{flex:1, height:'100%'}}>
                    <MySelect organizations={orgs} value={org} setter={handleSetOrg} creator={createNewOrg}/>
                </div>
                <div style={{flex:3, overflow:'auto', padding:'3%'}}>
                    {org !== -1 ? <OrgInfo org={orgInfo}/> : <NewOrg finish={finishCreation} update={updateOrgs}/>}
                </div>
            </div>
        </Paper>
    )
}

export async function getStaticProps() {

    const res = await fetch('http://localhost:3030/api/get-org-defaults')
    const data = await res.json()

    return {
        props: { data },
    }
}