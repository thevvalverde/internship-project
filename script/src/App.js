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

            setUserInfo(data.user)
            setConsents(data.consents)
            setCheckConsents(data.consents.map(consent => ({"value": consent.id, "description": consent.description})))
            setPolicy(data.policy)
            setVisible(true)
            console.log(consents);
            console.log(checkConsents);
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
