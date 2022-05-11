import {prisma} from "../../prisma/client"
import {cors, runMiddleware} from "./helper"

export default async function(req, res) {

    await runMiddleware(req, res, cors)

    const toCreate = req.body.toCreate;
    const receivedData = req.body.data;
    const orgRef = req.body.orgRef;

    try {

        const createdPromises = toCreate.map(c => (
            prisma.consent.create({
                data: {
                    policyID: receivedData.policy.id,
                    orgReference: orgRef,
                    subjectId: receivedData.user.id,
                    ...c
                }
            })
        ))

        const created = await Promise.all(createdPromises)

        res.status(200)
        res.json(created)
    } catch (error) {
        res.status(500)
        console.error(error);
        res.json({})
    }
}