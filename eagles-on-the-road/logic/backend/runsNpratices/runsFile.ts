import { GetOneRun, GetUserInfo } from "@/mongoConnect/CRUD";

interface runType{
    userId: string
    date: Date
    time: string | number,
    km: number,
    type: string,
    photo: string
}

export async function getMetricData(runId: any) {
    const run: runType = await GetOneRun(runId)
    const user = await GetUserInfo(run.userId)
    const hourToMin = () => {
        const hour = Number(String(run.time).slice(0,2)) * 60
        const min = Number(String(run.time).slice(3,5))
        const seconds = Math.trunc((Number(String((hour + min) / run.km).slice(2, 4)) * 60) / 99)
        return `${Math.trunc((hour + min) / run.km) }:${seconds < 10 ? `0${seconds}` : seconds}`
    }
    hourToMin()
    const allInfo = {
        runPhoto: run.photo && run.photo,
        name: user.name,
        photo: user.photo,
        date: run.date,
        runType: run.type,
        totalKm: run.km,
        time: run.time,
        avgKm: `${hourToMin()} min/km`
    }
    return allInfo
}