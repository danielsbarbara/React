import { getLeaderBoard } from "@/logic/backend/getLeaderBoard";
import { NextApiRequest, NextApiResponse } from "next";

export default async(req: NextApiRequest, res: NextApiResponse) => {
    const leaderboard = await getLeaderBoard()
    res.status(200).json({result: leaderboard})
}