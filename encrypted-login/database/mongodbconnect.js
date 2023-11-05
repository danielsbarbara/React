const {MongoClient} = require('mongodb')
const env = require('dotenv')
// const url = "mongodb://127.0.0.1:27017"
const url = "mongodb+srv://danielsantosbarbara:jAgcoomllaSWd5hP@cluster0.wxjbxxf.mongodb.net/"
const defaultDbName = "EncryptedPw"
let client = undefined

async function GetMongoClient(){
    if(!client){
        try{
            client = new MongoClient(url)
            await client.connect()
        } catch (err){
            console.log(err)
        }
    }
    return client
}

export async function GetCollection(dbName = defaultDbName, collectionName){
    const cli = await GetMongoClient()
    const db = cli.db(dbName)
    return db.collection(collectionName)
}

