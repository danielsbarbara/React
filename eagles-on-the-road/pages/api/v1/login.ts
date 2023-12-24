import { loginUser } from "@/logic/backend/auth/loginUser";
import { NextApiRequest, NextApiResponse } from "next";

const cookieTime: number = +process.env.JWT_COOKIE_EXPIRES_IN!

export default async (req: NextApiRequest, res: NextApiResponse) => {
    console.log('here');
    const result: Object | string = await loginUser(req.body)

    if(typeof result === 'string') return res.status(401).json({result})
    
    res.status(200).json({result})
}