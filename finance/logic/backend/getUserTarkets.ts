import {GetTargets, GetUserIdByToken } from "@/database/CRUD";

export async function getTargets(tokenId: any) {
    const userId: object = await GetUserIdByToken(tokenId)
    const targets: object = await GetTargets(userId)
    return targets
}