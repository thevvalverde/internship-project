import { Paper } from "@mui/material"
import { useEffect, useState } from "react"
import Header from "../components/Header"
import MySelect from "../components/MySelect"
import NewOrg from "../components/NewOrg"
import OrgInfo from "../components/OrgInfo"
import { BackgroundPaper, ContentDiv, PageBackDiv, SelectorDiv } from "./_app"

export default function Editor() {
    
    const [org, setOrg] = useState(0)           //  0 for none selected, -1 for create new org
    const [orgInfo, setOrgInfo] = useState({})  
    const [orgs, setOrgs] = useState([])

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
        const res = await fetch('/api/get-all-orgs')
        const data = await res.json()
        setOrgs(data.organizations)

    }

    useEffect(() => {
        const asyncFetchAndSet = async () => {
            const res = await fetch('/api/get-all-orgs')   // Fetch existing orgs
            const jsonres = await res.json()
            setOrgs(jsonres.organizations)
        }
        asyncFetchAndSet()
    },[])

    useEffect(() => {                                 // Get org data from database everytime some org is selected
        if(org===-1 || org===0) {
            return
        }
        const asyncFetchAndSet = async () => {
            const response = await fetch('/api/get-default-consents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    orgRef: org
                    
                })
            })
            const data = await response.json()
            setOrgInfo(data);
        }
        asyncFetchAndSet()

    }, [org])

    return (
        <BackgroundPaper>
            <Header/>
            <PageBackDiv>
                <SelectorDiv>
                    <MySelect items={orgs} value={org} setter={handleSetOrg} creator={createNewOrg} mode="organization"/>
                </SelectorDiv>
                <ContentDiv>
                    {org !== -1 ? <OrgInfo org={orgInfo}/> : <NewOrg finish={finishCreation} update={updateOrgs}/>}
                </ContentDiv>
            </PageBackDiv>
        </BackgroundPaper>
    )
}
