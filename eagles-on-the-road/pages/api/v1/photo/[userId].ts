import { ChangePhotoURL } from "@/mongoConnect/CRUD";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {userId} = req.query
    const {photoURL} = JSON.parse(req.body)
    const result = ChangePhotoURL(userId, photoURL)
    res.status(200).json({result: result})
}