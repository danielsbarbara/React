import { GetUser, SingUpNewUser } from "@/mongoConnect/CRUD"
const bcrypt = require('bcrypt')

interface UserInfoType{
    name: string,
    email: string,
    password: string,
    distance: number,
    photo: string
}

export async function singUpNewUser(userInfo: UserInfoType) {
    console.log(userInfo);
    const {email} = userInfo
    const user = await GetUser(email)
    if(user) return 'Este email já existe'
    const encryptedPassword = await bcrypt.hash(userInfo.password, 12)
    userInfo.password = encryptedPassword
    userInfo.distance = 0
    userInfo.photo = 'user-default.jpg'
    await SingUpNewUser(userInfo) 
    return true
}