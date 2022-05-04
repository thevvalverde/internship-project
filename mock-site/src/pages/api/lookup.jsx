import prisma from "../../db.ts";

export default async function (req, res) {

    const email = req.body.email

    try {
        const find = await prisma.user.findFirst({where: {email: email}})

        if(find) {
            res.json({found: 0})
        } else {
            res.json({found: 1, data})
        }
        res.status(200)
    } catch (error) {
        console.error("error:" + error); 
        res.status(500)
        res.json({error: "Something went wrong"})
    } 
}
