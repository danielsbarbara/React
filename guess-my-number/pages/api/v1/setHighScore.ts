import { setHighScore } from "@/logic/backend/sethighscore";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const token: string = req.body.token
    const highscore: number = req.body.highscore
    const result: any = await setHighScore(token, highscore)
    res.status(200).json({result: result})
}