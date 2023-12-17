import { AddKms, RegisterNewRun } from "@/mongoConnect/CRUD"

interface infoType{
    userId: string,
    type: string | undefined,
    description: string,
    km: string | number,
    time: string,
    date: Date | string
}

export async function registerNewPratcOrRun(info: infoType){
    const {km} = info
    await RegisterNewRun(info)
    const addTotalDistance = await AddKms(info.userId, km)
    return addTotalDistance
}