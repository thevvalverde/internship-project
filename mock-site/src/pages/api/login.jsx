import prisma from "../../db.ts";

export default async function (req, res) {
    
    const data = req.body

    try {
        const findUser = await prisma.user.findFirst({
            where: {
                email: data.email
            }
        })

        if(data.password !== findUser.hashpass) {
            res.json({status:0})
        } else {
            res.json({status:1, userInfo: findUser})
        }
        res.status(200)
    } catch (error) {
        console.error(error);
        res.status(500) 
        res.json({status: -1})
    }

}

