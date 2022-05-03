import prisma from "../../prisma/client"
import Cors from "cors"
// import data from "../../components/data"

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


export default async function(req, res) {

    await runMiddleware(req, res, cors)

    const toCreate = req.body.toCreate;
    const receivedData = req.body.data;
    const orgRef = req.body.orgRef;

    // console.log(toCreate);
    // console.log(receivedData);
    // return;

    try {

        const createdPromises = toCreate.map(c => (
            prisma.consent.create({
                data: {
                    policyID: receivedData.policy.id,
                    orgReference: orgRef,
                    subjectId: receivedData.user.id,
                    ...c
                }
            })
        ))

        const created = await Promise.all(createdPromises)

        // const defaultData = await prisma.defaultData.findFirst({
        //     where: {
        //         orgReference: orgRef
        //     }
        // })
        
        // let defaultConsents =  defaultData.defaultConsents.map(c => (JSON.parse(c)))

        // const orgInfo = await prisma.organization.findFirst({
        //     where: {
        //         id: orgRef
        //     }
        // })
            
        // let data = {defaultPolicy: defaultData.defaultPolicy, defaultConsents, orgInfo}
        
        res.status(200)
        res.json(created)
    } catch (error) {
        res.status(500)
        console.error(error);
        res.json({})
    }
}