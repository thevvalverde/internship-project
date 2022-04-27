import { IconButton } from "@mui/material"
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import MyTextField from "./MyTextField";

export default function ConsentList({items}) {
    return items.map((value, index) => {
        <div style={{position:"relative", display:"flex"}} key={index}>
            <div style= {{flex:1, paddingTop:15, paddingLeft:10}}>
                <IconButton aria-label="delete" color="error" onClick={() => removeConsent(index)}>
                    <RemoveCircleIcon/>
                </IconButton>
            </div>
            <div style={{flex:10, paddingRight:10}}>
                <MyTextField content={value.description} label={`Consent ${index}`} readonly={false} id={index}/>
            </div>
            <div style={{flex:3, paddingLeft:10}}>
                <MyTextField content={value.validUntil} label="Valid until" readonly={true} id={index}/>
            </div>
        </div>
    })
}