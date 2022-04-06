import prisma from "../../prisma/client";

export default async function (req, res) {
    const {allConsents, givenConsents, userInfo} = req.body

    try {
        allConsents.map(async c => {
            const updated = await prisma.consent.update({
                where: {
                    id: c,
                },
                data: {
                    subjectOption: false,
                }
            })
            console.log("falseUpdate -> " + updated.id)
        })

        givenConsents.map(async c => {
            const updated = await prisma.consent.update({
                where: {
                    id: c,
                },
                data: {
                    subjectOption: true,
                }
            })
            console.log("trueUpdate -> " + updated.id)
        })

        
    } catch (error) {
        res.status(500) 
        res.json({status: "Internal server error."})
        console.error("Internal error: " + error);
        return
    }

    res.status(200)
    res.json({status: "All changes saved!"})
}