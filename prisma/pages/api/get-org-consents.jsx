import prisma from "../../prisma/client"

export default async function (req, res) {

    const orgRef = parseInt(req.body);

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
            // console.log(h);
            return h
        })

        await Promise.all(array).then(values => {
            values.map(value => {
                if(value.length !== 0) {
                    history[value[0].consentID] = value;
                }
            })
        })

        console.log(history);
        // console.log(consents);

        res.status(200)
        res.json({consents, history})
    } catch (error) {
        res.status(500)
        console.error("There was an error: " + error);
        res.json({})
    }

}