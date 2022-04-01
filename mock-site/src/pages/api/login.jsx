import prisma from "../../db.ts";

export default async function (req, res) {
    
    const data = req.body

    try {
        res.status(200)
        const findUser = await prisma.user.findFirst({
            where: {
                email: data.email
            }
        })

        if(data.password !== findUser.hashpass) {
            res.json({status:0})
            console.log("status 0");
        } else {
            console.log("status 1");
            res.json({status:1, userInfo: findUser})
        }
    } catch (error) {
        console.error(error);
        res.status(500) 
        console.log("status -1");
        res.json({status: -1})
    }

}

