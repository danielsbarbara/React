import { DeleteTargets, GetUserIdByToken } from "@/database/CRUD"

export async function deleteUserTarget(token: string, deleteTarget: string) {
    const userId: object = await GetUserIdByToken(token)
    const result: any = await DeleteTargets(userId, deleteTarget)
    return result
}