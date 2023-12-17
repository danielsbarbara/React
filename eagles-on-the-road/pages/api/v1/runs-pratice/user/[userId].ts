import { GetAllRunsFromUser } from "@/mongoConnect/CRUD";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {userId} = req.query
    const userRuns = await GetAllRunsFromUser(userId)
    res.status(200).json({result: userRuns})
}