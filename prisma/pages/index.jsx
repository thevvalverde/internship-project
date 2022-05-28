import { Button, Container, Paper, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import Header from "../components/Header"
import OrgDataTable from "../components/OrgDataTable"
import OrgSearcher from "../components/OrgSearcher"
import { BackgroundPaper, ContentDiv, PageBackDiv, SelectorDiv } from "./_app"


function filterUnique(value, index, self) {
    return self.indexOf(value) === index;
}

export default function Home() {

    const [orgRef, setOrgRef] = useState("");
    const [baseData, setBaseData] = useState([])
    const [data, setData] = useState([]);
    const [available, setAvailable] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [sub, setSub] = useState(0)
    const [opt, setOpt] = useState(0)

    const updateRef = (e) => {
        setOrgRef(e.target.value)
    }

    const handleSetSub = (event) => {
        setSub(event.target.value)
    }

    const handleSetOpt = (event) => {
        setOpt(event.target.value)
    }

    const resetFilter = () => {
        setSub(0)
        setOpt(0)
    }

    const reset = () => {
        setData([])
        setAvailable(false)
        setSubjects([])
    }


    const fetchData = async () => {
        if(orgRef === "") {
            reset()
            alert("Please, insert your organization reference!")
            return;
        }
        const response = await fetch('/api/get-org-consents', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                orgRef: orgRef
            })
        })
        const consents = await response.json();
        if(consents.consents.length === 0) {
            reset()
            alert("No results were found!")
            return;
        }
        setAvailable(true)
        setData(consents)
        setBaseData(consents)
    }

    useEffect(() => {
        if(baseData.consents === undefined || baseData.consents.length === 0) {
            return;
        }
        const subs = []
        for(const k in baseData.users) {
            subs.push({id: k, email: baseData.users[k]});
        }
        subs.sort((a, b) => {
            if(a.email > b.email) {
                return 1;
            }
            if(a.email < b.email) {
                return -1;
            }
            return 0;
        })
        setSubjects(subs)
    }, [baseData, data])

    useEffect(() => {
        if(baseData.consents === undefined || baseData.consents.length === 0) {
            return;
        }
        const newList = {history: baseData.history, users: {}}
        newList.consents = baseData.consents.filter(e => {
            if(sub == 0) {
                if(opt == 0) {
                    return true
                }
                if(opt == 1) {
                    return e.subjectOption
                }
                return !e.subjectOption
            }
            if(opt == 0) {
                return e.subjectId === parseInt(sub);
            }
            if(opt == 1) {
                return e.subjectId === parseInt(sub) && e.subjectOption;
            }
            return e.subjectId === parseInt(sub) && !e.subjectOption;
        })
        for(const k in baseData.users) {
            if(sub === 0 || sub === k) {
                newList.users[k] = baseData.users[k];
            }
        }
        setData(newList)
    }, [sub, opt])

    return (
        <BackgroundPaper>
            <Header active={0}/>
            <PageBackDiv>
                <SelectorDiv>
                    <OrgSearcher 
                        updateRef={updateRef} 
                        orgRef={orgRef} 
                        fetchData={fetchData} 
                        available={available} 
                        subjects={subjects} 
                        sub={sub} 
                        handleSetSub={handleSetSub} 
                        opt={opt}
                        handleSetOpt={handleSetOpt}
                        resetFilter={resetFilter}
                    /> 
                </SelectorDiv>
                <ContentDiv>
                    <OrgDataTable data={data}/>
                </ContentDiv>
            </PageBackDiv>
        </BackgroundPaper>
    ) 
}