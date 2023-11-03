import { GetCollection } from "./mongoconnection";

export async function GetAllData(){
    const collection = await GetCollection('SpotiStats', 'b')
    const result = await collection.find().toArray()
    return result
}

export async function GetDataByYear(year){
    const collection = await GetCollection('SpotiStats', 'b')
    const result = await collection.find({ts: {$gte: `${year}-0-0`, $lt: `${Number(year+1)}-0-0`}}).toArray()
    return result
}