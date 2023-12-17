import { GetUser } from "@/mongoConnect/CRUD"
import { generateJWT } from "./createJwt"
import { ObjectId } from "mongodb"
const bcrypt = require('bcrypt')

interface userInfoType {
    email: string,
    password: string
}

interface userDbType {
    _id: ObjectId
    password: string | undefined
    token: string
}

export async function loginUser(userInfo: userInfoType) {
    const {email, password} = userInfo

    const user: userDbType = await GetUser(email)
    if(!user) return 'Email não encontrado!'

    const verifyPw = await bcrypt.compare(password, user.password)
    if(!verifyPw) return 'Password errada!'
    
    const token = await generateJWT(user._id)
    user.token = token
    user.password = undefined
    return user
}