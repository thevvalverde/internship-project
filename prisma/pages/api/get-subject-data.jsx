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

    const receivedData = req.body;
    const userToken = parseInt(receivedData.usertoken);
    const userEmail = receivedData.useremail;
    const consentInfo = receivedData.defaultdata;

    console.log(receivedData);
    console.log(userEmail);
    // console.log("inside api:" + JSON.stringify(data));

    try {
        let user = await prisma.client.findFirst({where:{email: userEmail}})
        let consents = [];
        let policy = {};
        if(user===null) {
            consents = consentInfo.defaultConsents
            user = await prisma.client.create({
                data: {
                    email: userEmail
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