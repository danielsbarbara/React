import { NextApiRequest } from "next";
import { promisify } from "util";

const jwt = require('jsonwebtoken')

export async function validateToken(req: NextApiRequest){
  const token = req.headers.authorization?.split(' ')[1]
    try {
        const decode = await promisify (jwt.verify)(token, process.env.JWT_SECRET)
        return true
    } catch(err){
        return false
    }
}