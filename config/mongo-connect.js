const { MongoClient } = require('mongodb')

require('dotenv').config({ path: '../.env' })

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.jundv.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`


const getMongoConnection = async () => {
  const client = new MongoClient(MONGO_URI)
  await client.connect()
  const db = client.db(process.env.MONGO_DB)

  return {
    client,
    db
  }
}

module.exports = getMongoConnection
