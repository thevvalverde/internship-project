import prisma from "../../db.ts";

export default async function (req, res) {
    
    // console.log("req:" + JSON.stringify(req.body, null, 2));
    // const prisma = new PrismaClient({log: ["query"]})

    // const { email, password, confirm }= JSON.stringify(values)

    console.log(JSON.stringify(req.body));

    const {email, password }= req.body

    try {
        const result = await prisma.user.create({
            data: {
                email: email,
                hashpass: password
            }
        })
        res.status(200)
        res.json({ userCreated: result})
    } catch (error) {
        console.error("error:" + error); 
        res.status(500)
        res.json({error: "Something went wrong"})
    } finally {
        // await prisma.$disconnect()
    }

}

