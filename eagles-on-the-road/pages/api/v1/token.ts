import { validateToken } from "@/logic/backend/auth/checkToken";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res:NextApiResponse) =>{
    const result = await validateToken(req)
    if(!result) res.status(400).json({result: result})
    res.status(200).json({result: result})
}