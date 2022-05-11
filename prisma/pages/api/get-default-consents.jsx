import {prisma} from "../../prisma/client"
import {cors, runMiddleware} from "./helper"

export default async function(req, res) {

    await runMiddleware(req, res, cors)

    const receivedData = req.body;
    const orgRef = receivedData.orgRef;

    try {
        const defaultData = await prisma.defaultData.findFirst({
            where: {
                orgReference: orgRef
            }
        })
        
        let defaultConsents =  defaultData.defaultConsents.map(c => (JSON.parse(c)))

        const orgInfo = await prisma.organization.findFirst({
            where: {
                id: orgRef
            }
        })
            
        let data = {defaultPolicy: defaultData.defaultPolicy, defaultConsents, orgInfo}
        
        res.status(200)
        res.json(data)
    } catch (error) {
        res.status(500)
        console.error(error);
        res.json({})
    }
}