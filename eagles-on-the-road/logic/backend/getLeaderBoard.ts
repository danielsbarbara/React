interface usersType {
    name: string
    _id: Object,
    photo: string
}

import { GetAllRuns, GetAllUsers, GetRunsKms } from "@/mongoConnect/CRUD";

export async function getLeaderBoard(){
    const users = await GetAllUsers()
    const runs = await users.map(async (el: usersType) => ({_id: el._id, name: el.name, photo: el.photo, distance: await GetRunsKms(String(el._id), 'runs')}))
    const pratice = await users.map(async (el: usersType) => ({_id: el._id, name: el.name, photo: el.photo, distance: await GetRunsKms(String(el._id), 'practice')}))
    const promisseRuns = await Promise.all(runs).then((value) => value)
    const promissePratice = await Promise.all(pratice).then((value) => value)
    const resultRuns = promisseRuns.map(el => ({_id: el._id, name: el.name, photo: el.photo, distance: el.distance[0]?.totalDistance})).sort((a, b) => (b.distance ? b.distance : 0) - (a.distance ? a.distance : 0))
    const resutlPratice = promissePratice.map(el => ({_id: el._id, name: el.name, photo: el.photo, distance: el.distance[0]?.totalDistance})).sort((a, b) => (b.distance ? b.distance : 0) - (a.distance ? a.distance : 0))
    const allTypes = users.sort((a: any, b: any) => b.distance - a.distance)
    return ({resultRuns, resutlPratice, allTypes})
}