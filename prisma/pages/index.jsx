import { Button, Container, Paper, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import Header from "../components/Header"
import DataTable from "../components/DataTable"
import Searcher from "../components/Searcher"


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
            body: JSON.stringify(orgRef)
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
        const subs = baseData.consents.map(e => e.subjectId).filter(filterUnique).sort((a,b) => a-b);
        setSubjects(subs)
    }, [baseData])

    useEffect(() => {
        if(baseData.consents === undefined || baseData.consents.length === 0) {
            return;
        }
        const newList = {}
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
                return e.subjectId === sub;
            }
            if(opt == 1) {
                return e.subjectId === sub && e.subjectOption;
            }
            return e.subjectId === sub && !e.subjectOption;
        })
        setData(newList)
    }, [sub, opt])

    return (
        <>
            <div style={{height:"12vh", position:'fixed', zIndex:3, width:'100%'}}>
                <Header/>
            </div>
            <div style={{display:'flex', top:'12%', position:'absolute', height:'88vh', width:'100%'}}>
                <div style={{flex:1, height:'100%'}}>
                    <Searcher 
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
                </div>
                <div style={{flex:3, height:'100%'}}>
                    <DataTable data={data}/>
                </div>
            </div>
        </>
    ) 
}