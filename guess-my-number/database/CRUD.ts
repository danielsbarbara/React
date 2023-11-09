import { ObjectId } from "mongodb";
import { GetCollection } from "./mongoDbConnect";

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

