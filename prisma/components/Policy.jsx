import React, { useEffect } from "react";
// import prisma from "../prisma/client";

export default function Policy(props) {
    let consents, policy;

    console.log("props.clientid: " + props.clientID);

    return <div className="policy-div">
                <div className="child-div">
                    <h2>Privacy Policy</h2>
                    <p>{props.policy.policy}</p>
                </div>
                <div className="child-div">
                {props.consents.map(consent => {
                    return <div className="consents" key={consent.consentID}>
                        <input type="checkbox" className="consent-checkbox" ></input>
                        <p className="consent-description">{consent.description}</p>
                    </div> 
                })}
                </div>
            </div>

}