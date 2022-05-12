import ExpandMore from '@mui/icons-material/ExpandMore';
import LaunchIcon from '@mui/icons-material/Launch';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Consent from "./Consent";

const baseurl = 'https://tp-back-office.herokuapp.com'


function containsObject(obj, list) {
    for(let i = 0; i < list.length; i++) {
        if(obj.description === list[i].description) {
            return true;
        }
    }
    return false;
}   

function getArrays(given, def) {

    let ready = [];
    let added = [];
    let removed = [];

    for(const element of given) {               // For each element of given consents,
        if(containsObject(element, def)) {      // if exists in defaults, it's ready to be served
            ready.push(element);
        } else {
            removed.push(element);              // if not exists in defaults, then it was removed from the company's consents
        }
    }
    for(const element of def) {                 // For each element of defaults,
        if(!containsObject(element, given)) {   // if not exists in given, then it was added to the company's consents
            added.push(element);
        }
    }
    return {ready: ready, toCreate: added, toRemove: removed}
}

function App({useremail, orgref}) {

    const [receivedData, setReceivedData] = useState({userEmail: useremail, orgRef: parseInt(orgref)})
    const [userInfo, setUserInfo] = useState({})
    const [consents, setConsents] = useState([])
    // const [checkConsents, setCheckConsents] = useState([])
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
                // setCheckConsents([])
                setPolicy({})
                setVisible(false)
                return
            }
            const response = await fetch(`${baseurl}/api/get-subject-data`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(receivedData)
            })
            const data = await response.json()

            const defaults = await fetch(`${baseurl}/api/get-default-consents`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    orgRef: receivedData.orgRef
                })
            })
            const defdata = await defaults.json()

            let {ready, toCreate, toRemove} = getArrays(data.consents, defdata.defaultConsents)

            const created = await fetch(`${baseurl}/api/create-new-consents`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                        toCreate: toCreate, 
                        orgRef: receivedData.orgRef, 
                        data: {
                            user: data.user, 
                            policy: data.policy
                        }
                    })
                }
            )

            const createRes = await created.json()

            const finalConsentList = [...ready, ...createRes];

            setUserInfo(data.user)
            setConsents(finalConsentList)
            setPolicy(data.policy)
            setVisible(true)


          }
          fetchData()          
        }, [receivedData])

        const formik = useFormik({
          initialValues: {},                                // Values are populated dynamically
          onSubmit: async (values) => {
            if(JSON.stringify(values) === '{}') {
                setVisible(false) 
                return;
            }

            let givenConsents = [];                         // values returned from submit are only the checkbox which were interacted with
            let revokedConsents = [];

            for(var id in values) {
                if(values[id].length===0) {                 // Turned off        
                    revokedConsents.push(parseInt(id))
                } else {
                    givenConsents.push(parseInt(id))        // Turned on
                }
            }
            
            const data = {revokedConsents, givenConsents, userInfo}
            
            setVisible(false) 

            await fetch(`${baseurl}/api/update-subject-data`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
        },
    })

    return (
        <div className='tek-parent-div'>

                <div className={visible ? "tek-main-container" : "tek-hidden"}>   
                    <div className={"tek-child-container tek-policy-child"}>
                        <h2 className={"tek-centered"}><Typography variant="h4">Consent Policy</Typography> </h2>
                        <Typography component="p">
                            {policy.policy || ""}
                        </Typography>
                    </div>


                    <div className={"tek-child-container tek-consents-child"}>
                        <form onSubmit={formik.handleSubmit} className="tek-form">
                            <Consent consents={consents} formik={formik}/>
                            <div className={"tek-form-submit-button"}>
                                <Button variant="contained" type="submit">Submit</Button>
                            </div>
                        </form>
                    </div>

                    <div className="tek-close-button">
                        <Button aria-label="Close" size="large" onClick={collapse} >
                            <ExpandMore/>
                        </Button>
                    </div>
                </div>
                <div className={visible ? "tek-hidden" : "tek-open-button"}>
                    <Button aria-label="Open" size="large" onClick={expand} sx={{borderRadius:"20%", backgroundColor:"#0084F7"}} >
                        <LaunchIcon sx={{color: "black"}}/>
                    </Button> 
                </div>
        </div>
    ) 
}

export default App;
