import prisma from "../../prisma/client"

export default async function (req, res) {

    const orgRef = parseInt(req.body);

    try {
        let consents = await prisma.consent.findMany({
            where: {
                orgReference: orgRef
            }
        })

        res.status(200)
        res.json({consents})
    } catch (error) {
        res.status(500)
        console.error("There was an error: " + error);
        res.json({})
    }

}