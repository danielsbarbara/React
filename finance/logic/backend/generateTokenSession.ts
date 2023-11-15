import { CreateNewSessionToken, GetUserId } from "@/database/CRUD";

export async function createTokenSession(email: string) {
    const userId: object = await GetUserId(email)
    const createNewSessionToken: any = await CreateNewSessionToken(userId)
    return createNewSessionToken
}