import { TextField } from "@mui/material"
import { Container } from "@mui/material"
import { IconButton, Button } from "@mui/material"
import { Paper } from "@mui/material"
import { useState, useEffect } from "react"
import MyTextField from "./MyTextField"
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export default function OrgInfo({org}) {

    const {defaultPolicy, defaultConsents, orgInfo} = org

    const [name, setName] = useState("")
    const [id, setId] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [policy, setPolicy] = useState("")
    const [consents, setConsents] = useState([])

    useEffect(() => {
        if(!orgInfo || orgInfo === 0) {
            return
        }
        setName(orgInfo.name)
        setId(orgInfo.id)
        setPhone(orgInfo.contactPhone)
        setEmail(orgInfo.contactEmail)
        setPolicy(defaultPolicy)
        setConsents(defaultConsents)
    }, [org])

    const handleSetName = (event) => {
        setName(event.target.value)
    }

    const handleSetPhone = (event) => {
        setPhone(event.target.value)
    }

    const handleSetEmail = (event) => {
        setEmail(event.target.value)
    }

    const handleSetPolicy = (event) => {
        setPolicy(event.target.value)
    }

    const removeConsent = (index) => {
        let arr = consents.slice()
        arr.splice(index, 1)
        setConsents(arr);
    }

    const addConsent = () => {
        let arr = consents.slice()
        arr.push({description: "", subjectOption: false, validUntil: ""})
        setConsents(arr)
    }

    const handleConsentChange = (event, index) => {
        let arr = consents.slice()
        arr[index].description = event.target.value;
        setConsents(arr)
    }

    const saveChanges = async() => {
        let newConsents = consents.filter(v => (v.description!==""));
        newConsents = newConsents.map(c => {
            if(c.validUntil === '') {
                return {...c, validUntil: (new Date('2029-02-28'))}
            } 
            return c
        })
        if(newConsents.length === 0 || policy === "" || name === "") {
            alert("Please fill all the fields")
            return;
        }
        
        let data = {
            newDefaultData: {
                defaultConsents: newConsents,
                defaultPolicy: policy
            },
            orgRef: id,
            orgUpdate: {
                name: name,
                contactEmail: email,
                contactPhone: phone,
            }
        }

        console.log(JSON.stringify(data, null, 2));

        const response = await fetch('/api/update-org-info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const jsonResponse = await response.json()
    }

    return (
        <Container disableGutters >
            {orgInfo ? (
                <>
                    <MyTextField content={name} handler={handleSetName} label="Organization Name" readonly={false} />
                    <MyTextField content={id} label="Organization ID" readonly={true} fw/>
                    <div style={{position:"relative", display:"flex"}}>
                        <div style={{flex:1, paddingRight:20}}>
                            <MyTextField content={email} handler={handleSetEmail} label="Email" readonly={false} />
                        </div>
                        <div style={{flex:1, paddingLeft:20}}>
                            <MyTextField content={phone} handler={handleSetPhone} label="Phone Number" readonly={false} />
                        </div>
                    </div>
                    <MyTextField content={policy} handler={handleSetPolicy} label="Default Policy" readonly={false} ml />
                    {consents.map((value, index) => {
                        return (
                            <div style={{position:"relative", display:"flex"}} key={index}>
                                <div style={{flex:10, paddingRight:10}}>
                                    <MyTextField content={value.description} handler={(event) => handleConsentChange(event,index)} label={`Consent ${index}`} readonly={false} id={index}/>
                                </div>
                                <div style={{flex:3, paddingLeft:10}}>
                                    <MyTextField content={value.validUntil} label="Valid until" readonly={true} id={index}/>
                                </div>
                                <div style= {{flex:1, marginTop:7, marginBottom:5, marginLeft:10, textAlign:'right'}}>
                                    <Button variant="outlined" aria-label="delete" color='info' sx={{height:'100%', width:'90%'}} onClick={() => removeConsent(index)}>
                                        X
                                    </Button>
                                </div>
                            </div>
                        )
                    })}
                    <Button variant="outlined" aria-label="add" color="success" sx={{width:'93%', marginTop:1}} onClick={addConsent}>+</Button>
                    <Button variant="contained" aria-label="save" color="warning" sx={{width:'15%', float:'right', marginTop:3}} onClick={saveChanges} >Save Changes</Button>
                </>
            )
            : null}
        </Container>
    )
}