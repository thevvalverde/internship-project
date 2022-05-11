import {prisma} from "../../prisma/client"
import {cors, runMiddleware} from "./helper"

export default async function (req, res) {

    await runMiddleware(req, res, cors)

    const id = req.body.user

    try {
        let consents = await prisma.consent.findMany({      // Find all consents from org, since it is the central table
            where: {
                subjectId: id
            }
        })

        let registeredOrgs = new Set()
        consents.map(e => registeredOrgs.add(e.orgReference)) // Get unique users

        let array = consents.map(async(consent) => {
            let h = await prisma.consentHistory.findMany({  
                where: {
                    consentID : consent.id
                }
            })
            return h
        })

        let history = {}

        await Promise.all(array).then(values => {
            values.map(value => {
                if(value.length !== 0) {
                    history[value[0].consentID] = value;
                }
            })
        })

        let oarray = [];

        for(let k of registeredOrgs) {
            oarray.push(prisma.organization.findFirst({where: {id: k}}));
        }
        let orgs = await Promise.all(oarray)

        orgs = orgs.reduce((l, c) => ({...l, [c.id]:c.name}), {})    // Get map of id to email

        res.status(200)
        res.json({consents, history, orgs})
    } catch (error) {
        res.status(500)
        console.error("There was an error: " + error);
        res.json({})
    }

}