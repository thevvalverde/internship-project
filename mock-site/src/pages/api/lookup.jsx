import prisma from "../../db.ts";

export default async function (req, res) {
    
    // console.log("req:" + JSON.stringify(req, null, 2));
    // const prisma = new PrismaClient({log: ["query"]})

    // const { email, password, confirm }= JSON.stringify(values)

    const email = req.body.email

    console.log("BODY: " + JSON.stringify(req.body));
    console.log("email: " + email);

    try {
        const find = await prisma.user.findFirst({where: {email: email}})
        // console.log(find);
        console.log("find: " + JSON.stringify(find));
        res.status(200)
        let response = {}

        const data = JSON.stringify(find)

        if(find===null) {
            res.json({found: 0})
        } else {
            res.json({found: 1, data})
        }

    } catch (error) {
        console.error("error:" + error); 
        res.status(500)
        res.json({error: "Something went wrong"})
        console.error(error);
    } finally {
        // await prisma.$disconnect()
    }

}
