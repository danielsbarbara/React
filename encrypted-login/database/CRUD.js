import { GetCollection } from "./mongodbconnect";

export async function CreateNewUser(user){
    const collection = await GetCollection("EncryptedPw", "User")
    const result = await collection.insertOne(user)
    return result
}

export async function GetUser(email){
    const collection = await GetCollection("EncryptedPw", "User")
    const result = await collection.findOne({email: email})
    return result
}

export async function CreateSessionToken(userId){
    const collection = await GetCollection("EncryptedPw", "Sessions")
    const result = await collection.insertOne({userId})
    return result.insertedId
}