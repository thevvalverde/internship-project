import prisma from "../../prisma/client"

export default async function (req, res) {

    const receivedData = req.body;
    const userInfo = receivedData.userInfo;
    const consentInfo = receivedData.data;

    console.log(receivedData);
    // console.log("inside api:" + JSON.stringify(data));

    try {
        let user = await prisma.client.findFirst({where:{email: userInfo.email}})
        let consents = [];
        let policy = {};
        if(user===null) {
            consents = consentInfo.defaultConsents
            user = await prisma.client.create({
                data: {
                    email: userInfo.email
                }
            })
            policy = await prisma.policy.create({
                data: {
                    policy: consentInfo.defaultPolicy,
                }
            })
            consents.map(async(consent) => {
                await prisma.consent.create({
                    data: {
                        ...consent, 
                        policy: {
                            connect: { id: policy.id }
                        },
                        organization: {
                            connect: { id: consentInfo.organizationID }
                        },
                        subject: {
                            connect: { id: user.id }
                        }
                    }
                })
            })

        } else {
            consents = await prisma.consent.findMany({
                where: {
                    subjectId: user.id,
                    orgReference: consentInfo.organizationID
                }
            })
            policy = await prisma.policy.findUnique({
                where: {
                    id: consents[0].policyID
                }
            })
        }
        res.status(200)
        res.json({user, consents, policy})
    } catch (error) {
        res.status(500)
        console.error("There was an error: " + error);
        res.json({})
    }

}