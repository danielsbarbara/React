import { NextApiRequest, NextApiResponse } from "next"
import * as fs from 'fs'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    
    try{
        fs.writeFileSync('options.json', req.body)
        res.status(200).json({result: 'Data saved!'})
    } catch (err) {
        res.status(400).json({result: 'Error'})
    }
}