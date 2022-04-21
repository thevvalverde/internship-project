import prisma from "../../prisma/client";
import Cors from "cors"

const cors = Cors({
    origin: true,
    methods: ['GET', 'POST']
})

function runMiddleware(req, res, f) {
    return new Promise((resolve, reject) => {
        f(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result)
            }
            return resolve(result)
        })
    })
}

export default async function (req, res) {

    await runMiddleware(req, res, cors)

    const {allConsents, givenConsents, userInfo} = req.body

    const notConsented = allConsents.filter(v => !givenConsents.includes(v))

    try {
        notConsented.map(async c => {
            const oldConsent = await prisma.consent.findUnique({
                where: {
                    id: c
                }
            })
            const changeToFalse = (oldConsent !== null && oldConsent.subjectOption)
            // console.log("change to false in " + c + ": " + changeToFalse);
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
                // console.log("created history -> " + history.id + " for consent " + c);
            }
                // console.log("falseUpdate -> " + updated.id)
        })

        givenConsents.map(async c => {
            const oldConsent = await prisma.consent.findUnique({
                where: {
                    id: c
                }
            })
            const changeToTrue = (oldConsent !== null && !oldConsent.subjectOption)
            // console.log("change to true in " + c + ": " + changeToTrue);
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
                // console.log("created history -> " + history.id + " for consent " + c);
            }
            // console.log("trueUpdate -> " + updated.id)
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