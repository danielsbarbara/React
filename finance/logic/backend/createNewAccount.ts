import { AssociateAccount, CreateNewAccount, GetUserId } from "@/database/CRUD";

export async function createNewAccount(email: string){
    
    const userId: object = await GetUserId(email)

    const optionsAccount = {
        userId,
        movements: []
    }

    const createAccount: object = await CreateNewAccount(optionsAccount)
    const associateAccount: object = await AssociateAccount(userId, createAccount)
    return
}