import { userScores } from "@/logic/backend/getUsersScores";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const result: Array<object> = await userScores()
    res.status(200).json({result: result})
} 