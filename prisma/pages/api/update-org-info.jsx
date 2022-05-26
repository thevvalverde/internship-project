import {prisma} from "../../prisma/client"
import {cors, runMiddleware} from "./helper"

// Saves new information or default consents/policy for a given organization.

export default async function(req, res) {

    await runMiddleware(req, res, cors);

    const receivedData = req.body;
    const {newDefaultData, orgRef, orgUpdate} = receivedData;

    newDefaultData.defaultConsents = newDefaultData.defaultConsents.map(e => JSON.stringify(e))

    try {

        const upsertOrg = await prisma.organization.upsert({
            where: {
                id: orgRef
            },
            update: orgUpdate,
            create: orgUpdate
        })

        const oldDefault = await prisma.defaultData.findFirst({
            where: {
                orgReference: upsertOrg.id
            }
        })

        const upsertDefault = await prisma.defaultData.upsert({
            where: {
                id: (oldDefault ? oldDefault.id : -1)
            },
            update: newDefaultData,
            create: {orgReference: upsertOrg.id , ...newDefaultData}
        })
        
        res.status(200)
        res.json({upsertOrg})
    } catch (error) {
        res.status(500) 
        console.error(error);
        res.json({"Error:": error})
    }
}