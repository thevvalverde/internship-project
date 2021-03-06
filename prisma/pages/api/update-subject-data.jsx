import {prisma} from "../../prisma/client";
import { cors, runMiddleware } from "./helper";

// Saves a given subject data, e.g. their consents, revoked or given.

export default async function (req, res) {

    await runMiddleware(req, res, cors)

    const {revokedConsents, givenConsents, userInfo} = req.body

    try {
        revokedConsents.map(async c => {
            const oldConsent = await prisma.consent.findUnique({
                where: {
                    id: c
                }
            })
            const changeToFalse = (oldConsent !== null && oldConsent.subjectOption)
            const updated = await prisma.consent.update({
                where: {
                    id: c,
                },
                data: {
                    subjectOption: false,
                    consentDate: new Date(),
                    revokeDate: (changeToFalse ? new Date() : oldConsent.revokeDate)
                }
            })
            if(oldConsent === null || oldConsent.subjectOption) {
                const history = await prisma.consentHistory.create({
                    data: {
                        consentID: c,
                        changedValue: false
                    }
                })
            }
        })

        givenConsents.map(async c => {
            const oldConsent = await prisma.consent.findUnique({
                where: {
                    id: c
                }
            })
            const changeToTrue = (oldConsent !== null && !oldConsent.subjectOption)
            const updated = await prisma.consent.update({
                where: {
                    id: c,
                },
                data: {
                    subjectOption: true,
                    consentDate: new Date(),
                    revokeDate: (changeToTrue ? null : oldConsent.revokeDate)
                }
            })
            if(oldConsent === null || !oldConsent.subjectOption) {
                const history = await prisma.consentHistory.create({
                    data: {
                        consentID: c,
                        changedValue: true
                    }
                })
            }
        })

        
    } catch (error) {
        res.status(500) 
        res.json({status: "Internal server error."})
        console.error("Internal error: " + error);
        return
    }

    res.status(200)
    res.json({status: "All changes saved!"})
}