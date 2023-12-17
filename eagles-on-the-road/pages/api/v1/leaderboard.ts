import { getLeaderBoard } from "@/logic/backend/getLeaderBoard";
import { NextApiRequest, NextApiResponse } from "next";

export default async(req: NextApiRequest, res: NextApiResponse) => {
    const leaderboard = await getLeaderBoard()
    console.log(leaderboard);
    res.status(200).json({result: leaderboard})
}