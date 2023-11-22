import {AssociateAccount, CreateNewAccount, CreateNewTargets, GetUserId } from "@/database/CRUD";

export async function createNewAccount(email: string){
    
    const userId: object = await GetUserId(email)

    const optionsAccount = {
        userId,
        movements: [],
    }

    const targetObject = {
        userId,
        targets: []
    }

    const createAccount: object = await CreateNewAccount(optionsAccount)
    const targetId: object = await CreateNewTargets(targetObject)
    const associateAccount: object = await AssociateAccount(userId, createAccount, targetId)
    return
}