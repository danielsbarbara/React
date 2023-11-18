import { getmov } from "@/logic/backend/getMov";
import { NextApiRequest, NextApiResponse } from "next";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {getMovements} = req.query
    const movements = await getmov(getMovements)
    res.status(200).json({result: movements})
}