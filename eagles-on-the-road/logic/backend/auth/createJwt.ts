import { ObjectId } from "mongodb"
const jwt = require('jsonwebtoken')

export async function generateJWT(userId: ObjectId) {
    const jwtExpire: string = process.env.JWT_EXPIRES!
    return jwt.sign({_id: userId}, process.env.JWT_SECRET, {expiresIn: jwtExpire})
}