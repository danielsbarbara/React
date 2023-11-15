import { aproveLogIn } from "@/logic/backend/aproveLogIn";
import { createTokenSession } from "@/logic/backend/generateTokenSession";
import { NextApiRequest, NextApiResponse } from "next";

interface infoUser {
    email: string,
    password: string
}

export default async (req:NextApiRequest, res:NextApiResponse) => {
    const {email, password}: infoUser = req.body
    const result: true | string = await aproveLogIn(email, password)
    if(result === "Email doesn't exists") return res.status(401).json({result: result})
    if(result === "Incorrect Password") return res.status(401).json({result: result})
    const token: string = await createTokenSession(email)
    return res.status(200).json({result: token})
}