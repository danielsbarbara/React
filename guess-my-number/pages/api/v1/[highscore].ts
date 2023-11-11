import { GetUserHighScore, GetUserIdOnSessions } from "@/database/CRUD";
import { NextApiRequest, NextApiResponse } from "next";

export default async(req: NextApiRequest, res: NextApiResponse) => {
    const token: any = req.query.highscore
    const userId: object = await GetUserIdOnSessions(token)
    const highScore: number = await GetUserHighScore(userId)
    res.status(200).json({result: highScore})
}