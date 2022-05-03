import prisma from "../../prisma/client"
import Cors from "cors"

const cors = Cors({
    origin: true,
    methods: ['GET', 'POST']
})

function runMiddleware(req, res, f) {
    return new Promise((resolve, reject) => {
        f(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result)
            }
            return resolve(result)
        })
    })
}


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