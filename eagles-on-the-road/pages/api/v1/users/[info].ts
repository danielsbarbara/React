import { GetRunsKms, GetUserInfo } from "@/mongoConnect/CRUD";
import { NextApiRequest, NextApiResponse } from "next";


export default async (req:NextApiRequest, res:NextApiResponse) => {
    const userId = req.query.info
    const userInfo = await GetUserInfo(userId)
    const kmPratice = await GetRunsKms(userId, 'practice', 'All')
    const kmRuns = await GetRunsKms(userId, 'runs', 'All')
    userInfo.practice = kmPratice
    userInfo.runs = kmRuns
    res.status(200).json({result: userInfo})
}