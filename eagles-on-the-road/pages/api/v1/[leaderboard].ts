import { getLeaderBoard } from "@/logic/backend/getLeaderBoard";
import { NextApiRequest, NextApiResponse } from "next";

export default async(req: NextApiRequest, res: NextApiResponse) => {
    try{
        if (typeof req.query.leaderboard === 'string'){
           return res.status(200).json({result: await getLeaderBoard(req.query.leaderboard!)})
        }
    } catch(err){
           return res.status(400).json({result: err})
    }
}