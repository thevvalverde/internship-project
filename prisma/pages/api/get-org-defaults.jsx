import {prisma} from "../../prisma/client"
import {cors, runMiddleware} from "./helper"

export default async function (req, res) {

    await runMiddleware(req, res, cors)
    
    try {
        const organizations = await prisma.organization.findMany();
        res.status(200)
        res.json({organizations: organizations})
    } catch (error) {
        res.status(500)
        console.error("There was an error: " + error);
        res.json({organizations: organizations})
    }

}