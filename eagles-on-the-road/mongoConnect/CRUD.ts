import { ObjectId } from 'mongodb'
import {GetCollection} from './mongoConnect'

const dbName = process.env.DATABASE_NAME
const userCollection = process.env.DATABASE_USERS_COLLECTION
const runCollection = process.env.DATABASE_RUN_COLLECTION
const praticeCollection = process.env.DATABASE_PRATICE_COLLECTION

//CRUD para usuários
export async function SingUpNewUser(userInfo: Object) {
    const collection = await GetCollection(dbName, userCollection)
    const result = await collection.insertOne(userInfo)
    return result
}

export async function GetUser(userEmail: string) {
    const collection = await GetCollection(dbName, userCollection)
    const result = await collection.findOne({email: userEmail})
    return result
}

export async function GetUserInfo(userId: any) {
    const collection = await GetCollection(dbName, userCollection)
    const user = await collection.findOne({_id: new ObjectId(userId)})
    user.password = undefined
    return user
}

export async function GetAllUsers() {
    const collection = await GetCollection(dbName, userCollection)
    const user = await collection.find({role: 'user'}).project({password: 0, email: 0}).toArray()
    return user
}

export async function ChangePhotoURL(userId: any, photoURL: string) {
    const collection = await GetCollection(dbName, userCollection)
    const user = await collection.updateOne({_id: new ObjectId(userId)}, {$set: {photo: photoURL}})
    return user
}

//Adicionar km's ao usuário
export async function AddKms(userId: string, km: string | number) {
    const collection = await GetCollection(dbName, userCollection)
    const result = await collection.updateOne({_id: new ObjectId(userId)}, {$inc: {distance: km}})
    return result
}

//Subtrai kms quando o usuário elimina o treino/corrida
export async function SubtractKms(userId: string, km: number) {
    const collection = await GetCollection(dbName, userCollection)
    const result = await collection.updateOne({_id: new ObjectId(userId)}, {$inc: {distance: km * (-1)}})
    return result
}

// CRUD para corridas ou treinos
export async function RegisterNewRun(info: Object) {
    const collection = await GetCollection(dbName, runCollection)
    const result = await collection.insertOne(info)
    return result
}

export async function GetRun(runId: string) {
    const collection = await GetCollection(dbName, runCollection)
    const result = await collection.findOne({_id: new ObjectId(runId)})
    return result
}

export async function GetAllRunsFromUser(userId: any) {
    const collection = await GetCollection(dbName, runCollection)
    const result = await collection.find({userId: userId}).sort({date: -1}).toArray()
    return result
}

export async function DeleteRun(runId: string) {
    const collection = await GetCollection(dbName, runCollection)
    const result = await collection.deleteOne({_id: new ObjectId(runId)})
    return result
}

export async function GetAllRuns() {
    const collection = await GetCollection(dbName, runCollection)
    const result = await collection.find().toArray()
    return result
}

//Obter todos os kms em treino ou corrida
export async function GetRunsKms(userId: any, type: string) {
    const collection = await GetCollection(dbName, runCollection)
    // const result = await collection.find({userId: userId}).toArray()
    const result = await collection.aggregate([{$match: {userId: userId, type: type}},
    {$group: {
        _id: type,
        totalDistance: {$sum: '$km'},
    }}
    ]).toArray()
    return result
}

//obter todos os treinos/corridas
export async function GetAllRunsPratice(userId: string, type: string) {
    let result
    const collection = await GetCollection(dbName, runCollection)
    if(type === 'all') {
        result = await collection.find({userId: userId}).toArray()
    } else {
        result = await collection.find({userId: userId, type: type}).toArray()
    }
    return result
}

