const { MongoClient } = require('mongodb')

const url: string | undefined = process.env.DATABASE_URL
const DBname: string | undefined = process.env.DATABASE_NAME

let client: any = undefined
async function GetMongoClient() {
    if (!client) {
        try {
            client = new MongoClient(url)
            await client.connect()
            console.log('⚡️ DB connections successfully! ⚡️')
        } catch (err) {
            console.log(err)
        }
    }
    return client
}

export async function GetCollection(dbName: string | undefined = DBname, collectionName: string | undefined) {
    const cli = await GetMongoClient()
    const db = await cli.db(dbName)
    return db.collection(collectionName)
}
