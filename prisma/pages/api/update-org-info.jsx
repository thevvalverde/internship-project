import prisma from "../../prisma/client"

export default async function(req, res) {

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
                orgReference: orgRef
            }
        })

        const upsertDefault = await prisma.defaultData.upsert({
            where: {
                id: (oldDefault ? oldDefault.id : -1)
            },
            update: newDefaultData,
            create: {orgReference: orgRef, ...newDefaultData}
        })
        
        res.status(200)
        res.json({})
    } catch (error) {
        res.status(500) 
        console.error(error);
        res.json({"Error:": error})
    }
}