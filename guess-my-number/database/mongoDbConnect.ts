const {MongoClient} = require('mongodb')

const url: any = process.env.MONGODB_URI
// const url: string = "mongodb://127.0.0.1:27017"
const dbDefaultName: string = "Guess-my-number"
let client: any = undefined

async function GetMongoClient() {
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

export async function GetCollection(dbName: string = dbDefaultName, collectionName:string) {
    const cli: any = await GetMongoClient()
    const db: any = await cli.db(dbName)
    return db.collection(collectionName)
}