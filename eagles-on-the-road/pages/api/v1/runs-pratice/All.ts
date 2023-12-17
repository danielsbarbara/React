import { GetAllRunsPratice } from "@/mongoConnect/CRUD";
import { NextApiRequest, NextApiResponse } from "next";

export default async(req: NextApiRequest, res: NextApiResponse) => {
    const {userId, type} = req.body
    const result = await GetAllRunsPratice(userId, type)
    res.status(200).json({result: result})
}