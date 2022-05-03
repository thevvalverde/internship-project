import ExpandMore from '@mui/icons-material/ExpandMore'
import LaunchIcon from '@mui/icons-material/Launch';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useFormik, Form } from "formik";
import { useEffect, useState } from "react";
import Consent from "./Consent";
import './App.css';
import './index.css'
import { FieldArray } from 'formik';
import { Formik } from 'formik';
import { Field } from 'formik';


function containsObject(obj, list) {
    for(let i = 0; i < list.length; i++) {
        if(obj.description === list[i].description) {
            return true;
        }
    }
    return false;
}   

function compareVersions(given, def) {
    let ans = [];
    let added = [];
    let removed = [];
    for(const element of given) {
        if(containsObject(element, def)) {
            ans.push(element);
        } else {
            removed.push(element);
        }
    }
    for(const element of def) {
        if(!containsObject(element, given)) {
            added.push(element);
        }
    }
    return {ready: ans, toCreate: added, toRemove: removed}
}

function App({useremail, orgref}) {

    const [receivedData, setReceivedData] = useState({userEmail: useremail, orgRef: parseInt(orgref)})
    const [userInfo, setUserInfo] = useState({})
    const [consents, setConsents] = useState([])
    const [checkConsents, setCheckConsents] = useState([])
    const [policy, setPolicy] = useState({})
    const [visible, setVisible] = useState(true)

    const collapse = () => {
        setVisible(false)
    }

    const expand = () => {
        if(receivedData.userEmail === "")
            return
        setVisible(true)
    }

    useEffect(() => {
      async function fetchData() {
            if(receivedData.userEmail === "") {
                setUserInfo({})            
                setConsents([])
                setCheckConsents([])
                setPolicy({})
                setVisible(false)
                return
            }
            const response = await fetch('http://localhost:3030/api/get-subject-data', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(receivedData)
            })
            const data = await response.json()
            console.log(data);

            const defaults = await fetch('http://localhost:3030/api/get-default-consents', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({orgRef: receivedData.orgRef})
            })
            const defdata = await defaults.json()

            console.log(defdata.defaultConsents);

            let {ready, toCreate, toRemove} = compareVersions(data.consents, defdata.defaultConsents)

            const created = await fetch('http://localhost:3030/api/create-new-consents', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({toCreate: toCreate, orgRef: receivedData.orgRef, data: {user: data.user, policy: data.policy}})
            })
            const createRes = await created.json()

            const finalConsentList = [...ready, ...createRes];

            setUserInfo(data.user)
            setConsents(finalConsentList)
            setCheckConsents(finalConsentList.map(consent => ({"value": consent.id, "description": consent.description})))
            setPolicy(data.policy)
            setVisible(true)


            // TODO
            // See if consents removed from back-office should be deleted from database
            // const removed = await fetch('http://localhost:3030/api')

          }
          fetchData()          
        }, [receivedData])

        const formik = useFormik({
          initialValues: {},
          onSubmit: async (values) => {
            if(JSON.stringify(values) === '{}') {
                alert("Saved.")
                setVisible(false) 
                return;
            }
            let givenConsents = [];
            let revokedConsents = [];
            for(var id in values) {
                if(values[id].length===0) {
                    revokedConsents.push(parseInt(id))
                } else {
                    givenConsents.push(parseInt(id))
                }
            }
            
            const data = {revokedConsents, givenConsents, userInfo}
            
            setVisible(false) 

            const response = await fetch('http://localhost:3030/api/update-subject-data', {
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
        <div className='tek-parent-div'>
                <div className={visible ? "main-container" : "hidden"}>
                    <div className={visible ? "child-container left-child" : "hidden"}>
                        <h2 className={receivedData.usertoken === "0" ? "hidden" : "centered"}><Typography variant="h4">Consent Policy</Typography> </h2>
                        <Typography component="p">
                            {policy.policy || ""}
                        </Typography>
                    </div>

                    <div className="separator"></div>

                    <div className={visible ? "child-container right-child" : "hidden"}>
                    <form onSubmit={formik.handleSubmit} className="form">
                        <Consent consents={consents} formik={formik}/>
                        <div className={receivedData.usertoken === "0" ? "hidden" : "form-submit-button"}>
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

export default App;
