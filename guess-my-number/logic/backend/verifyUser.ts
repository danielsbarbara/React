import { CheckUserByEmail, GetAllUsers, NewSession } from "@/database/CRUD"
import { compare } from "bcrypt-ts/browser"

export async function verifyUser(email: string, password: string){

    const info: any = await CheckUserByEmail(email)

    if(info === null) return []

    const hash: string = info.password
    
    const matched: Boolean = await compare(password, hash)
    
    if(!matched) return []
    
    const newSessionToken: object = await NewSession(info._id)
    
    return newSessionToken
}