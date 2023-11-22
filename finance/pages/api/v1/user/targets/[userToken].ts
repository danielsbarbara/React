import { getTargets } from "@/logic/backend/getUserTarkets";
import { NextApiRequest, NextApiResponse } from "next";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {userToken} = req.query
    const result: any = await getTargets(userToken)
    res.status(200).json({result: result})
}