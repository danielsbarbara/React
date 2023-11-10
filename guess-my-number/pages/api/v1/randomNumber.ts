import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const randomNumber: number = Math.trunc(Math.random()*20)
    res.status(200).json({result: randomNumber})
}