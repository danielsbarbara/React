import { insertAmount } from "@/logic/backend/insertAmount";
import { NextApiRequest, NextApiResponse } from "next";

interface incomeInfo {
    token: string,
    date: string,
    description: string,
    amount: string
}

export default async (req: NextApiRequest, res:NextApiResponse) => {
   try {
    const insertAmmountOnTheAccount: Boolean = await insertAmount(req.body)
    res.status(200).json({result: insertAmmountOnTheAccount})
} catch (err) {
    res.status(400).json({result: "Ocorreu um erro"})
}
}