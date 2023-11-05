import { CreateSessionToken, GetUser } from "@/database/CRUD";

export async function gettoken(email){
    const user = await GetUser(email)
    const createToken = await CreateSessionToken(user._id)
    return createToken
}