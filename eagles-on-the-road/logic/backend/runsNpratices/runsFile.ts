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
        // const avg = (1 + 23) / run.km
        // console.log(avg)
        return hour + min
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
        avgKm: `${(hourToMin() / run.km).toFixed(0)} min/km`
    }
    return allInfo
}