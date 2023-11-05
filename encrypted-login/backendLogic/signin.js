import { GetUser } from "@/database/CRUD";
import { CreateNewUser } from '@/database/CRUD'
const bcrypt = require('bcrypt')
const saltRounds = 10

export async function signin(user){
    console.log(new Date())
    const result = await GetUser(user.email)
    if(result) return false
    const {password} = user
    let newuser = user
     bcrypt.genSalt(saltRounds, function(err, salt){
        bcrypt.hash(password, salt, async function(err,hash){
            newuser = {...newuser, password: hash}
              await CreateNewUser(newuser)
        })
    })
    console.log(new Date())
    return true
}