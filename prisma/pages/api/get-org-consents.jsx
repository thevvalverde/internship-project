import prisma from "../../prisma/client"

export default async function (req, res) {

    const orgRef = parseInt(req.body.orgRef);

    try {
        let consents = await prisma.consent.findMany({
            where: {
                orgReference: orgRef
            }
        })

        let history = {}

        let array = consents.map(async(consent) => {
            let h = await prisma.consentHistory.findMany({
                where: {
                    consentID : consent.id
                }
            })
            return h
        })

        await Promise.all(array).then(values => {
            values.map(value => {
                if(value.length !== 0) {
                    history[value[0].consentID] = value;
                }
            })
        })

        let users = await prisma.client.findMany()

        users = users.reduce((l, c) => ({...l, [c.id]:c.email}), {})

        res.status(200)
        res.json({consents, history, users})
    } catch (error) {
        res.status(500)
        console.error("There was an error: " + error);
        res.json({})
    }

}