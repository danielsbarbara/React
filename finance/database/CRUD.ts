import { GetCollection } from "./connecToMongo"

interface mongoObj{
    collection: object,
    _id: object,
    email: string | undefined,
    insertedId: object
    findOne: Function,
    insertOne: Function,
    password: string
}

const dbName: string = "FinanceApp"
const Users: string = "Users"
const Sessions: string = "Sessions"

export async function CheckUserByEmail(email: string) {
    const collection: mongoObj = await GetCollection(dbName, Users)
    const result: mongoObj = await collection.findOne({email})
    return result?.email ?? false
}

export async function RegisterNewUser(userInfo: object) {
    const collection: mongoObj = await GetCollection(dbName, Users)
    const result: mongoObj = await collection.insertOne(userInfo)
    return result.insertedId
}

export async function GetUserPassword(email: string) {
    const collection: mongoObj = await GetCollection(dbName, Users)
    const result: mongoObj = await collection.findOne({email})
    return result.password
}

export async function GetUserId(email: string) {
    const collection: mongoObj = await GetCollection(dbName, Users)
    const result: mongoObj = await collection.findOne({email: email})
    return result._id
}

export async function CreateNewSessionToken(userId: object) {
    const collection: mongoObj = await GetCollection(dbName, Sessions)
    const result: mongoObj = await collection.insertOne({userId})
    return result.insertedId
}