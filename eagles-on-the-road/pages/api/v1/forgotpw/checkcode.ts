import { CheckCode } from "@/mongoConnect/CRUD";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {email, code} = req.body
    const validate = await CheckCode(email, code)
    if(!validate) return res.status(400).json({result: false})
    res.status(200).json({result: true})
}