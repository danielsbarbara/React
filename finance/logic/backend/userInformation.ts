import { GetUserIdByToken, GetUserInfo } from "@/database/CRUD";

export async function getUserInfo(tokenId: string){
    const userId: object = await GetUserIdByToken(tokenId)
    const userInfo: object = await GetUserInfo(userId)
    return userInfo
}   