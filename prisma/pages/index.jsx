import { Button, Container, Paper, TextField, Typography } from "@mui/material"
import { useState } from "react"
import Header from "../components/Header"
import DataTable from "../components/DataTable"
import Searcher from "../components/Searcher"


export default function Home() {

    const [orgRef, setOrgRef] = useState("");
    const [data, setData] = useState([]);
    const [available, setAvailable] = useState(false);

    const updateRef = (e) => {
        setOrgRef(e.target.value)
    }

    const fetchData = async () => {
        if(orgRef === "") {
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
        if(JSON.stringify(consents)==="{}") {
            alert("No results were found!")
            setAvailable(false)
            return;
        }
        setAvailable(true)
        setData(consents)
    }

    return (
        <>
            <div style={{height:"12vh", position:'fixed', zIndex:3, width:'100%'}}>
                <Header/>
            </div>
            <div style={{display:'flex', top:'12%', position:'absolute', height:'88vh', width:'100%'}}>
                <div style={{flex:1, height:'100%'}}>
                    <Searcher updateRef={updateRef} orgRef={orgRef} fetchData={fetchData}/> 
                </div>
                <div style={{flex:3, height:'100%'}}>
                    <DataTable data={data} available={available}/>
                </div>
            </div>
        </>
    ) 
}