import { CheckUserByEmail, GetUserId, RegisterNewUser } from "@/database/CRUD";
import { genSalt } from "bcrypt-ts";
import { hash } from "bcrypt-ts/browser";

interface userInfoObj {
    name: string,
    email: string,
    password: string,
}

export async function registerNewUser(userInfo: userInfoObj){
    const {name, email, password}: userInfoObj = userInfo

    const verfyIfExists: string | Boolean = await CheckUserByEmail(email)
    console.log(verfyIfExists)
    if(verfyIfExists) return false

    genSalt(10).then((salt) => hash(password, salt)).then((hash) => {
        const newUser: userInfoObj = {
            name: name,
            email: email,
            password: hash
        }
        RegisterNewUser(newUser)
    })
    return true
}