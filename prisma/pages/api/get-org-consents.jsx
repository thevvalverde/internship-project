import {prisma} from "../../prisma/client"
// import {cors, runMiddleware} from "./helper"

export default async function (req, res) {

    const orgRef = parseInt(req.body.orgRef);

    try {
        let consents = await prisma.consent.findMany({      // Find all consents from org, since it is the central table
            where: {
                orgReference: orgRef
            }
        })

        let registeredUsers = new Set()
        consents.map(e => registeredUsers.add(e.subjectId)) // Get unique users

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

        let uarray = [];

        for(let k of registeredUsers) {
            uarray.push(prisma.client.findFirst({where: {id: k}}));
        }
        let users = await Promise.all(uarray)

        users = users.reduce((l, c) => ({...l, [c.id]:c.email}), {})    // Get map of id to email

        res.status(200)
        res.json({consents, history, users})
    } catch (error) {
        res.status(500)
        console.error("There was an error: " + error);
        res.json({})
    }

}