import { deleteRun } from "@/logic/backend/runsNpratices/deleteRun";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res:NextApiResponse) => {
    const {userId} = req.query
    if(req.method === 'DELETE'){
        await deleteRun(userId)
        res.status(200).json({result: true})
    }
}