import { ObjectId } from "mongodb"
const jwt = require('jsonwebtoken')

export async function  generateJWT(userId: ObjectId) {
    return jwt.sign({_id: userId}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES!})
}