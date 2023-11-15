import { CheckUserByEmail, GetUserPassword } from "@/database/CRUD"
import { compare } from "bcrypt-ts";

export async function aproveLogIn(email: string, password: string){

    const checkIfExists: string | Boolean = await CheckUserByEmail(email)
    if(!checkIfExists) return "Email doesn't exists"

    const dbPassword: string = await GetUserPassword(email)
    
    return compare(password, dbPassword).then((result) => {
        if(result) return true
        return 'Incorrect Password'
    })
}