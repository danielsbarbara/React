import { GetUserIdOnSessions, UpdateHighScore } from "@/database/CRUD";

export async function setHighScore(token: string, highscore: number){
 const userId: object = await GetUserIdOnSessions(token)
 const updateHighScore: number = await UpdateHighScore(userId, highscore)
 return updateHighScore
}