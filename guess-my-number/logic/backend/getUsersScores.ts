import { GetAllUsers } from "@/database/CRUD";

export async function userScores(){
    const users: any = await GetAllUsers()
    const result: Array<object> = 
    users.map((item: any) => ({_id: item._id, name: item.name, score: item.highscore}))
    .sort((a: any, b: any) => b.score - a.score) 
    return result
}