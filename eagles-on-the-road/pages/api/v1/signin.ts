import { singUpNewUser } from "@/logic/backend/auth/signNewUser";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        if(req.method === 'POST'){
            const result = await singUpNewUser(req.body)
            if(typeof result === 'string') return res.status(401).json({result: 'Este email já existe'})
            res.status(200).json({result})
        }
    } catch(err){
        console.log(err)
    }
}