import { deleteUserTarget } from "@/logic/backend/deleteTarget";
import { NextApiRequest, NextApiResponse } from "next";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {token, deleteTarget}: any = req.query
    const result: any = await deleteUserTarget(token, deleteTarget)
    res.status(200).json({result: true})
}