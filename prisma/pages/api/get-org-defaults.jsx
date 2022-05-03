import prisma from "../../prisma/client"

export default async function (req, res) {

    
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