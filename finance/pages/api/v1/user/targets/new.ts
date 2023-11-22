import { setNewTarget } from "@/logic/backend/setNewTarget";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const result: Boolean | undefined = await setNewTarget(req.body)
    res.status(200).json({result: result})
}