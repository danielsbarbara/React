import { getMetricData } from "@/logic/backend/runsNpratices/runsFile";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {runId} = req.query
    const result = await getMetricData(runId)
    res.status(200).json({result: result})
}