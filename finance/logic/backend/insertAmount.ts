import { GetUserIdByToken, InsertIncomeOutcome } from "@/database/CRUD"

interface incomeInfo {
    token: string,
    date: string,
    description: string,
    amount: string
}

interface inObj {
    date: string,
    description: string,
    amount: string
}

export async function insertAmount({token, date, description, amount}: incomeInfo){
    const userId: object = await GetUserIdByToken(token)
    const incomeObj = {
        date,
        description,
        amount
    }
    const insertAmount: any = await InsertIncomeOutcome(userId, incomeObj)
    return true
}