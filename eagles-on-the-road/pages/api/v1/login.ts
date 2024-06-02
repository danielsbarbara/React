import { loginUser } from "@/logic/backend/auth/loginUser";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const cookieTime: number = +process.env.JWT_COOKIE_EXPIRES_IN!

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const result: Object | string = await loginUser(req.body)
    result === 'string' && res.status(401).json({result})
    result !== 'string' && res.status(200).json({result})
}