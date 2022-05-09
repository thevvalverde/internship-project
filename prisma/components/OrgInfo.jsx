import { Button, Container, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { useEffect, useState } from "react"
import MyTextField from "./MyTextField"
import { TextField } from "@mui/material"

export default function OrgInfo({org}) {

    const {defaultPolicy, defaultConsents, orgInfo} = org

    const [name, setName] = useState("")
    const [id, setId] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [policy, setPolicy] = useState("")
    const [consents, setConsents] = useState([])
    const [display, setDisplay] = useState("")

    useEffect(() => {
        if(!orgInfo || orgInfo === 0) {
            return
        }
        setName(orgInfo.name)
        setId(orgInfo.id)
        setPhone(orgInfo.contactPhone)
        setEmail(orgInfo.contactEmail)
        setDisplay(orgInfo.display)
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

    const handleSetDisplay = (event) => {
        setDisplay(event.target.value)
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

    const handleDateChange = (newValue, index) => {
        let arr = consents.slice()
        arr[index].validUntil = newValue
        setConsents(arr)
    }

    const saveChanges = async() => {
        let newConsents = consents.filter(v => (v.description!==""));
        for(let c of newConsents) {
            if(c.validUntil === '') {
                alert('Please fill all the fields')
                return
            }
        }
        if(newConsents.length === 0 || policy === "" || name === "") {
            alert("Please fill all the fields")
            return;
        }
        setConsents(newConsents)
        
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
                display: display
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
        <Container>
            {orgInfo ? (
                <>
                    <Typography variant="overline" sx={{color:"warning.light"}}>Organization Info</Typography>
                    <MyTextField content={name} handler={handleSetName} label="Organization Name" readonly={false} />
                    <div style={{position: 'relative', display: 'flex'}}>
                        <div style={{flex: 4, paddingRight:20}}>
                            <MyTextField content={id} label="Organization ID" readonly={true} fw/>
                        </div>
                        <div style={{flex: 1}}>
                            <FormControl fullWidth sx={{mt:1, backgroundColor:'secondary.light', borderRadius:1, color:'secondary.contrastText',width:'103%'}}>
                            <InputLabel id="display-select" sx={{color:'info.main', paddingTop:'3px'}}>Display</InputLabel>
                                <Select
                                    labelId="display-select"
                                    id="display-select"
                                    label="Display"
                                    value={display}
                                    onChange={handleSetDisplay}
                                    sx={{color: 'secondary.contrastText', width:'100%'}}
                                >
                                    <MenuItem value={0}></MenuItem>
                                    <MenuItem value={1}>Bottom</MenuItem>
                                    <MenuItem value={2}>Left</MenuItem>
                                    <MenuItem value={3}>Right</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div style={{position:"relative", display:"flex"}}>
                        <div style={{flex:1, paddingRight:20}}>
                            <MyTextField content={email} handler={handleSetEmail} label="Email" readonly={false} />
                        </div>
                        <div style={{flex:1, paddingLeft:20}}>
                            <MyTextField content={phone} handler={handleSetPhone} label="Phone Number" readonly={false} />
                        </div>
                    </div>
                    <Typography variant="overline" sx={{color:"warning.light"}}>Privacy and Consents Info</Typography>
                    <MyTextField content={policy} handler={handleSetPolicy} label="Default Policy" readonly={false} ml />
                    {consents.map((value, index) => {
                        return (
                            <div style={{position:"relative", display:"flex"}} key={index}>
                                <div style={{flex:10, paddingRight:10}}>
                                    <MyTextField content={value.description} handler={(event) => handleConsentChange(event,index)} label={`Consent ${index}`} readonly={false} id={index}/>
                                </div>
                                <div style={{flex:3, paddingLeft:10}}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="Valid until"
                                            value={value.validUntil}
                                            onChange={(newValue) => {
                                                handleDateChange(newValue, index)
                                            }}
                                            renderInput={(params) => <TextField 
                                                sx={{marginTop: '8px', backgroundColor:'secondary.light', input: {color: 'secondary.contrastText'}, label: {color: 'info.light', padding:'3px'}, textarea: {color: 'secondary.contrastText'}}}
                                            {...params} />}
                                        />
                                    </LocalizationProvider>
                                    {/* <MyTextField content={value.validUntil} label="Valid until" readonly={true} id={index}/> */}
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