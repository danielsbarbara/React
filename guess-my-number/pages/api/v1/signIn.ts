import { verifyIfExists } from "@/logic/backend/userExists"
import { NextApiRequest, NextApiResponse } from "next"


export default async(req: NextApiRequest, res: NextApiResponse) =>{
    const name: string = req.body.name
    const email: string = req.body.email
    const password: string = req.body.password
    const infoResult: boolean = await verifyIfExists(email, password, name)
    if(!infoResult) res.status(401).json({result: infoResult})
    res.status(200).json({result: infoResult})
}