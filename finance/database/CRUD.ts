import { ObjectId } from "mongodb"
import { GetCollection } from "./connecToMongo"
import User from "@/pages/api/v1/user/info/[user]"

interface mongoObj{
    collection: object,
    _id: object,
    userId: object,
    name: string | undefined,
    email: string | undefined,
    insertedId: object
    findOne: Function,
    insertOne: Function,
    updateOne: Function,
    password: string,
    movements: Array<string>
    targets: object
}

const dbName: string = "FinanceApp"
const Users: string = "Users"
const Sessions: string = "Sessions"
const accounts: string = "Accounts"
const Targets: string = "Targets"

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

export async function GetUserIdByToken(token: string) {
    const collection: mongoObj = await GetCollection(dbName, Sessions)
    const result: mongoObj = await collection.findOne({_id: new ObjectId(token)})
    return result.userId
}

export async function GetUserName(email: string) {
    const collection: mongoObj = await GetCollection(dbName, Users)
    const result: mongoObj = await collection.findOne({email: email})
    return result.name
}

export async function GetUserInfo(userId: object) {
    const collection: mongoObj = await GetCollection(dbName, Users)
    const result: mongoObj = await collection.findOne({_id: userId})
    const userInfo = {
        name: result.name,
        email: result.email
    }
    return userInfo
}

// Sessions Collection
export async function CreateNewSessionToken(userId: object) {
    const collection: mongoObj = await GetCollection(dbName, Sessions)
    const result: mongoObj = await collection.insertOne({userId})
    return result.insertedId
}


//Accounts Collection
export async function CreateNewAccount(account: object) {
    const collection: mongoObj = await GetCollection(dbName, accounts)
    const result: mongoObj = await collection.insertOne({...account})
    return result.insertedId
}

export async function AssociateAccount(userId:object, accountId:object, targetId: object) {
    const collection: mongoObj = await GetCollection(dbName, Users)
    console.log(targetId)
    const result: mongoObj = await collection.updateOne({_id: userId}, {$set: {account: accountId, targets: targetId}})
    return result
}

export async function InsertIncomeOutcome(userId: object, incomeObject: object) {
    const collection: mongoObj = await GetCollection(dbName, accounts)
    const result: mongoObj = await collection.updateOne({userId: userId}, {$push: {movements: {$each : [incomeObject], $position: 0}}})
    return result
}

export async function GetMovements(userId: object) {
    const collection: mongoObj = await GetCollection(dbName, accounts)
    const result: mongoObj = await collection.findOne({userId})
    return result.movements
}

//Targets Collections
export async function CreateNewTargets(targetObject: object) {
    const collection: mongoObj = await GetCollection(dbName, Targets)
    const result: mongoObj = await collection.insertOne({...targetObject})
    return result.insertedId
}

export async function GetTargets(userId: object) {
    const collection: mongoObj = await GetCollection(dbName, Targets)
    const result: mongoObj = await collection.findOne({userId})
    return result?.targets
}

export async function SetNewTarget(userId: object, newTargetObject: object) {
    const collection: mongoObj = await GetCollection(dbName, Targets)
    const result: mongoObj = await collection.updateOne({userId: userId}, {$push: {targets: {$each: [newTargetObject], $position: 0}}})
    return result
} 

export async function DeleteTargets(userId: object, deleteTarget: string) {
    const collection: mongoObj = await GetCollection(dbName, Targets)
    const result: mongoObj = await collection.updateOne({userId: userId}, {$pull: {targets: {description: deleteTarget}}})    
    return result
}