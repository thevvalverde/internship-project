import { DialogTitle } from "@mui/material"
import { Typography } from "@mui/material"
import { Dialog } from "@mui/material"
import { useEffect } from "react"
import { useState } from "react"
import Header from "../components/Header"
import MySelect from "../components/MySelect"
import UserDataTable from "../components/UserDataTable"
import { BackgroundPaper, ContentDiv, PageBackDiv, SelectorDiv } from "./_app"

export default function UserEditor() {

    const [user, setUser] = useState(0)
    const [users, setUsers] = useState([])
    const [baseData, setBaseData] = useState([])
    const [data, setData] = useState([]);
    const [available, setAvailable] = useState(false);
    const [organizations, setOrganizations] = useState([]);
    const [org, setOrg] = useState(0);
    const [opt, setOpt] = useState(0);
    const [open, setOpen] = useState(false);
    const [policyId, setPolicyId] = useState(0);
    const [policy, setPolicy] = useState("")

    const handleSetOrg = (event) => {
        setOrg(event.target.value)
    }

    const handleSetOpt = (event) => {
        setOpt(event.target.value)
    }

    const resetFilter = () => {
        setOrg(0)
        setOpt(0)
    }

    const reset = () => {
        setData([])
        setAvailable(false)
        setOrganizations([])
    }

    const handleSetUser = (e) => {
        setUser(e.target.value)
    }

    useEffect(() => {
        const asyncFetchAndSet = async () => {
            const res = await fetch('/api/get-all-users')   // Fetch existing orgs
            const jsonres = await res.json()
            setUsers(jsonres.users)
        }
        asyncFetchAndSet()
    },[])

    useEffect(() => {
        const asyncFetchAndSet = async () => {

            const response = await fetch('/api/get-all-consents', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({user: user}) 
            })
            const jsonresponse = await response.json()
            setAvailable(jsonresponse.consents.length !== 0)
            setData(jsonresponse)
            setBaseData(jsonresponse)
        }
        asyncFetchAndSet()
    }, [user])

    useEffect(() => {
        if(baseData.consents === undefined || baseData.consents.length === 0) {
            return;
        }
        const orgs = []
        for(const k in baseData.orgs) {
            orgs.push({id: k, name: baseData.orgs[k]});
        }
        orgs.sort((a, b) => {
            if(a.name > b.name) {
                return 1;
            }
            if(a.name < b.name) {
                return -1;
            }
            return 0;
        })
        setOrganizations(orgs)
    }, [baseData, data])

    useEffect(() => {
        if(baseData.consents === undefined || baseData.consents.length === 0) {
            return;
        }
        const newList = {history: baseData.history, orgs: {}}
        newList.consents = baseData.consents.filter(e => {
            if(org == 0) {
                if(opt == 0) {
                    return true
                }
                if(opt == 1) {
                    return e.subjectOption
                }
                return !e.subjectOption
            }
            if(opt == 0) {
                return e.orgReference === parseInt(org);
            }
            if(opt == 1) {
                return e.orgReference === parseInt(org) && e.subjectOption;
            }
            return e.orgReference === parseInt(org) && !e.subjectOption;
        })
        for(const k in baseData.orgs) {
            if(org === 0 || org === k) {
                newList.orgs[k] = baseData.orgs[k];
            }
        }
        setData(newList)
    }, [org, opt])

    useEffect(() => {
        if(policyId === 0) {
            return
        }
        const asyncFetchAndSet = async () => {

            const response = await fetch('/api/get-policy', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({policy: policyId})
            })
            const json = (await response.json()).policy
            setPolicy(json.policy)
        }
        asyncFetchAndSet()

    }, [policyId])

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSetPolicyId = (e) => {
        setPolicyId(e.target.value)
        handleOpen()
    }

    return (
        <BackgroundPaper>
            <Header active={2}/>
            <Dialog
                open={open}
                onClose={handleClose}

            >
                <DialogTitle sx={{textAlign: "center"}}>Privacy Policy</DialogTitle>
                <Typography variant="body1" sx={{p:2}}>
                    {policy}
                </Typography>

            </Dialog>
            <PageBackDiv>
                <SelectorDiv>
                    <MySelect 
                        items={users}
                        value={user} 
                        setter={handleSetUser} 
                        mode="user"
                        available={available} 
                        organizations={organizations}
                        handleSetOrg={handleSetOrg} 
                        org={org} 
                        opt={opt}
                        handleSetOpt={handleSetOpt}
                        resetFilter={resetFilter}

                    />
                </SelectorDiv>
                <ContentDiv>
                    <UserDataTable data={data} handleSetPolicyId={handleSetPolicyId} />
                </ContentDiv>
            </PageBackDiv>
        </BackgroundPaper>
    )

}
