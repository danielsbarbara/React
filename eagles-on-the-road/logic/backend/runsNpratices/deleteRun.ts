import { DeleteRun, GetRun, SubtractKms } from "@/mongoConnect/CRUD";

export async function deleteRun(runId: any) {
    const findRun = await GetRun(runId)
    const {userId, km} = findRun
    await SubtractKms(userId, km)
    await DeleteRun(runId)
    return
}