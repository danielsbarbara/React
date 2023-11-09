import { CheckUserByEmail, CreateNewUser } from "@/database/CRUD"
import { genSalt, hash } from "bcrypt-ts"



export async function verifyIfExists(email: string, password:string, name: string) {
    
    const exist: any = await CheckUserByEmail(email)
    if(exist !== null) return false
    //if not exist, create a encrypted password and store the new user in Database
    genSalt(10).then((salt)=> hash(password, salt)).then((hash) =>{
        const password: string = hash
        const newUser: object = {name, email, password}
        CreateNewUser(newUser)
    })
    return true
}