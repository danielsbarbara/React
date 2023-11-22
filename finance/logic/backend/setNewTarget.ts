import { GetUserIdByToken, SetNewTarget } from "@/database/CRUD"



export async function setNewTarget(input: object){
    const {userToken, description, targetValue}: any = input
    const userId = await GetUserIdByToken(userToken)
    const newTarget ={
        description,
        targetValue
    }
    const result = await SetNewTarget(userId, newTarget)
    return true
}