import { sendEmail } from "@/logic/backend/sendEmail";
import { GetUser } from "@/mongoConnect/CRUD";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {email} = req.query

    if(typeof email === 'string'){
        const result = await GetUser(email)
        if(result) {
            const sendedEmail = await sendEmail(email)
            return res.status(200).json({result: true})
        }
        return res.status(400).json({result: false})
    }
}