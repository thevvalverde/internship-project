import {prisma} from "../../prisma/client"
import {cors, runMiddleware} from "./helper"

export default async function(req, res) {

    await runMiddleware(req, res, cors)

    const policyId = req.body.policy;

    try {

        const policy = await prisma.policy.findUnique({
            where: {
                id: parseInt(policyId)
            }
        })

        res.status(200)
        res.json({policy: policy})
    } catch (error) {
        res.status(500)
        console.error(error);
        res.json({})
    }
}