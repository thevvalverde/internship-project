import {prisma} from "../../prisma/client"
import {cors, runMiddleware} from "./helper"

// Returns all user information and consents for a given subject and organization.

export default async function (req, res) {

    await runMiddleware(req, res, cors)

    const receivedData = req.body;
    // console.log(receivedData);
    const userEmail = receivedData.userEmail;
    const orgRef = receivedData.orgRef;
    let user = null;
    let consents = [];
    let policy = {};

    try {
        user = await prisma.client.findFirst({where:{email: userEmail}});

        if(!user) {
            user = await prisma.client.create({
                data: {
                    email: userEmail
                }
            })
        }

        consents = await prisma.consent.findMany({
            where: {
                subjectId: user.id,
                orgReference: orgRef
            }
        })

        if(consents.length === 0) {
            console.log("Consent length 0");
            const response = await fetch('https://tp-back-office.herokuapp.com/api/get-default-consents', { // Fetch default consents data for this organization
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ orgRef: orgRef })
            })
            const {defaultPolicy, defaultConsents} = await response.json()

            policy = await prisma.policy.create({ data: { policy: defaultPolicy }})
            let consentPromises = defaultConsents.map(async(consent) => {
                return await prisma.consent.create({
                    data: {
                        ...consent,
                        policyID: policy.id,
                        orgReference: orgRef,
                        subjectId: user.id,
                    }
                })
            })
            consents = await Promise.all(consentPromises)
        } else {
            policy = await prisma.policy.findUnique({
                where: {
                    id: consents[0].policyID,
                }
            })
        }

        console.log("Get-subject-data");
        console.log({user, consents, policy});
        res.status(200)
        res.json({user, consents, policy})
    } catch (error) {
        res.status(500)
        console.error("There was an error: " + error);
        res.json({})
    }

}