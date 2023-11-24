const {MongoClient} = require('mongodb')

interface mongoObj{
    cli: object,
    db: Function
    collection: Function
}

const url: string = "mongodb+srv://danielsantosbarbara:mURZnT8aArD9xNbx@cluster0.kqh81yz.mongodb.net/?retryWrites=true&w=majority"
const defaultDbName: string = "FinanceApp"

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

export async function GetCollection(dbName: string = defaultDbName, collectionName: string) {
    const cli: mongoObj = await GetMongoClient()
    const db: mongoObj = await cli.db(dbName)
    return db.collection(collectionName)
}