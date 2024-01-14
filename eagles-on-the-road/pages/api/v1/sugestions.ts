import { RegisterNewSugestion } from "@/mongoConnect/CRUD";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        const sugestion = JSON.parse(req.body)
        await RegisterNewSugestion(sugestion)
        res.status(201).json({result: '⚡️'})
    } catch(e) {
        res.status(400).json({result: 'Não foi possivel registar a tua sugestão, tenta novamente mais tarde!'})
    }
}