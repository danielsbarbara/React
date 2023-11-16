import { GetCollection } from "./connecToMongo"

interface mongoObj{
    collection: object,
    _id: object,
    name: string | undefined,
    email: string | undefined,
    insertedId: object
    findOne: Function,
    insertOne: Function,
    updateOne: Function,
    password: string
}

const dbName: string = "FinanceApp"
const Users: string = "Users"
const Sessions: string = "Sessions"
const accounts: string = "Accounts"

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

export async function GetUserName(email: string) {
    const collection: mongoObj = await GetCollection(dbName, Users)
    const result: mongoObj = await collection.findOne({email: email})
    return result.name
}

export async function CreateNewSessionToken(userId: object) {
    const collection: mongoObj = await GetCollection(dbName, Sessions)
    const result: mongoObj = await collection.insertOne({userId})
    return result.insertedId
}

export async function CreateNewAccount(account: object) {
    const collection: mongoObj = await GetCollection(dbName, accounts)
    const result: mongoObj = await collection.insertOne({...account})
    return result.insertedId
}

export async function AssociateAccount(userId:object, accountId:object) {
    const collection: mongoObj = await GetCollection(dbName, Users)
    const result: mongoObj = await collection.updateOne({_id: userId}, {$set: {account: accountId}})
    return result
}