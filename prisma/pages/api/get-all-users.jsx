import {prisma} from "../../prisma/client"
import {cors, runMiddleware} from "./helper"

// Return every user registered with any organization.

export default async function (req, res) {

    await runMiddleware(req, res, cors)

    try {
        const users = await prisma.client.findMany();
        res.status(200)
        res.json({users: users})
    } catch (error) {
        res.status(500)
        console.error("There was an error: " + error);
        res.json({users: users})
    }

}