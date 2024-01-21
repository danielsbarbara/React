import { ChangePw } from "@/mongoConnect/CRUD";
import { NextApiRequest, NextApiResponse } from "next";
const bcrypt = require('bcrypt')

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {email, password} = req.body
        const encryPw = await bcrypt.hash(String(password), 12)
        await ChangePw(email, encryPw)
        res.status(200).json({result: true})
    } catch(e) {
        res.status(400).json({result: false})
    }
}