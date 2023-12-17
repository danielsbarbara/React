import { registerNewPratcOrRun } from "@/logic/backend/runsNpratices/registerRunOrPratices";
import { NextApiRequest, NextApiResponse } from "next";

export default async(req:NextApiRequest, res:NextApiResponse) => {
    const result = await registerNewPratcOrRun(req.body)
    res.status(200).json({result: result})
}