import { GetMovements, GetUserId, GetUserIdByToken } from "@/database/CRUD";

export async function getmov(token: any) {
    const userId: object = await GetUserIdByToken(token)
    const mov: Array<string> | null = await GetMovements(userId)
    return mov
}