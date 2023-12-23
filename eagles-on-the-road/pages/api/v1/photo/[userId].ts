import { NextApiRequest, NextApiResponse } from "next";
import multer from 'multer'
import { uploadSubmissionFile } from "@/logic/backend/submissionPhoto";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const path = await uploadSubmissionFile(req, res)
    res.status(200)
}








