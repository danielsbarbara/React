interface usersType {
    name: string
    _id: Object,
    photo: string
}

import { GetAllRuns, GetAllUsers, GetRunsKms } from "@/mongoConnect/CRUD";

export async function getLeaderBoard(date: string){
    let allTypes: any
    const users = await GetAllUsers()
    const runs = await users.map(async (el: usersType) => ({_id: el._id, name: el.name, photo: el.photo, distance: await GetRunsKms(String(el._id), 'runs', date)}))
    const pratice = await users.map(async (el: usersType) => ({_id: el._id, name: el.name, photo: el.photo, distance: await GetRunsKms(String(el._id), 'practice', date)}))
    const promisseRuns = await Promise.all(runs).then((value) => value)
    const promissePratice = await Promise.all(pratice).then((value) => value)
    const resultRuns = promisseRuns.map(el => ({_id: el._id, name: el.name, photo: el.photo, distance: el.distance[0]?.totalDistance})).sort((a, b) => (b.distance ? b.distance : 0) - (a.distance ? a.distance : 0))
    const resutlPratice = promissePratice.map(el => ({_id: el._id, name: el.name, photo: el.photo, distance: el.distance[0]?.totalDistance})).sort((a, b) => (b.distance ? b.distance : 0) - (a.distance ? a.distance : 0))
    if(date === 'All'){
        allTypes = users.sort((a: any, b: any) => b.distance - a.distance)
    } else {
        if(resultRuns[0].distance === undefined){ 
            allTypes = resutlPratice
        } else {
            for (let i = 0; i < resutlPratice.length; i++) {
                for(let y = 0; y < resultRuns.length; y++){
                    if(resultRuns[y]._id === resutlPratice[i]._id){
                        if(allTypes){
                            allTypes = [...allTypes, allTypes[i] = {...resutlPratice[i], distance: resutlPratice[i].distance + (resultRuns[y].distance === undefined ? 0 : +resultRuns[y].distance)}]
                        } else {
                            allTypes = [{...resutlPratice[i], distance: resutlPratice[i].distance + (resultRuns[y].distance === undefined ? 0 : +resultRuns[y].distance)}]
                        }
                    }
                }
            }
            allTypes.sort((a: any, b: any) => b.distance - a.distance)
        }
    }
    return ({resultRuns, resutlPratice, allTypes})
}