import prisma from "../../prisma/client"
// import data from "../../components/data"

export default async function(req, res) {

    const receivedData = req.body;
    const orgRef = receivedData.orgRef;

    try {
        
        const defaultData = await prisma.defaultData.findFirst({
            where: {
                orgReference: orgRef
            }
        })
        
        let defaultConsents =  defaultData.defaultConsents.map(c => (
            JSON.parse(c)
            ))
            
            let data = {defaultPolicy: defaultData.defaultPolicy, defaultConsents}
            
            
            res.status(200)
            res.json(data)
        } catch (error) {
            res.status(500)
            console.error(error);
            res.json({})
        }
}