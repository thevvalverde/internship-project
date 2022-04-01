import prisma from "../../prisma/client"

export default async function (req, res) {

    const data = req.body;

    // console.log("inside api:" + JSON.stringify(data));

    try {
        let user = await prisma.client.findFirst({where:{email: data.email}})
        let consents = []
        if(user===null) {
            user = await prisma.client.create({
                data: {
                    clientID: data.id,
                    email: data.email
                }
            })
        } else {
            consents = await prisma.consent.findMany({where: {subjectId: user.clientID}})
        }
        res.status(200)
        res.json({user, consents})
    } catch (error) {
        res.status(500)
        console.error("There was an error: " + error);
    }

}