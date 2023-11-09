import { verifyUser } from "@/logic/backend/verifyUser"
import { NextApiRequest, NextApiResponse } from "next"


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const email: string = req.body.email
    const password: string = req.body.password
    const result = await verifyUser(email, password)
    res.status(200).json({result: result})
}