import { ObjectId } from "mongodb";
import { GetCollection } from "./mongoDbConnect";
import { userAgent } from "next/server";

const db: string = 'Guess-my-number'
const collectionUsers: string = 'users'

export async function GetAllUsers() {
    const collection: any = await GetCollection(db, collectionUsers)
    const result: Array<object> = await collection.find().toArray()
    return result
}

export async function CheckUserByEmail(email: string) {
    const collection: any = await GetCollection(db, collectionUsers)
    const result: object = await collection.findOne({email: email})
    return result
}

export async function CreateNewUser(newUser: object){
    const collection: any = await GetCollection(db, collectionUsers)
    const result: any = await collection.insertOne(newUser)
    return result
}

export async function NewSession(userId: ObjectId) {
    const collection: any = await GetCollection(db, 'sessions')
    const result: any = await collection.insertOne({userId: userId})
    return result.insertedId
}

export async function GetUserIdOnSessions(token: string) {
    const collection: any = await GetCollection(db, 'sessions')
    const result: Promise<object> = await collection.findOne({_id: new ObjectId(token)})
    const {userId}: any = result
    return userId
}


export async function UpdateHighScore(userId: object, Inhighscore: number) {
    const collection: any = await GetCollection(db, collectionUsers)
    const result: Promise<object> = await collection.updateOne(
        {_id: userId}, {$set: {highscore: Inhighscore}})
    const user: Promise<object> = await collection.findOne({_id: userId})
    const {highscore}: any = user
    return highscore
}


export async function GetUserHighScore(userId: object) {
    const collection: any = await GetCollection(db, collectionUsers)
    const result: Promise<object> = await collection.findOne({_id: userId})
    const {highscore}: any = result
    return highscore
}

