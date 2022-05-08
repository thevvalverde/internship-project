import prisma from "../../prisma/client"
import {cors, runMiddleware} from "./helper"

export default async function (req, res) {

    await runMiddleware(req, res, cors)

    const orgRef = req.body.orgRef
    
    try {
        const organization = await prisma.organization.findUnique({
            where: {
                id: parseInt(orgRef)
            }
        });
        res.status(200)
        res.json({display: organization.display})
    } catch (error) {
        res.status(500)
        console.error("There was an error: " + error);
        res.json({})
    }

}