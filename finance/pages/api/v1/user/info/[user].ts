import { getUserInfo } from "@/logic/backend/userInformation";
import { NextApiRequest, NextApiResponse } from "next";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {user}: any = req.query
    if(!user) return res.status(400).json({result: 'Error'})
    const userInfo: object = await getUserInfo(user)
    res.status(200).json({result: userInfo})
}