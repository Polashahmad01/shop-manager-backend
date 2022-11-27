const router = require('express').Router()
const { ObjectId } = require('mongodb')

const mongo = require('../../../services/mongo-crud')
const mongoConnect = require('../../../config/mongo-connect')

createApplePhone = async (req, res, next) => {
  const { db, client } = await mongoConnect()

  try {
    const applePhone = await mongo.insertOne(db, 'apple-phone', req.body)
    res.status(201).json({ success: true, data: applePhone })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, data: { error }})
  } finally {
    await client.close()
  }
}

getApplePhone = async (req, res, next) => {
  const { db, client } = await mongoConnect()

  try {
    const applePhone = await mongo.fetchMany(db, 'apple-phone')
    res.status(200).json({ success: true, data: applePhone })
  } catch (error) {
    res.status(500).json({ success: false, data: { error }})
  } finally {
    await client.close()
  }
}

deleteApplePhone = async (req, res, next) => {
  const { db, client } = await mongoConnect()
  const id = req.params.id

  try {
    const applePhone = await mongo.deleteOne(db, 'apple-phone', { _id: ObjectId(id)})
    res.status(200).json({ success: true, data: applePhone})
  } catch (error) {
    res.status(500).json({ success: false, data: { error }})
  } finally {
    await client.close()
  }
}

updateApplePhone = async (req, res, next) => {
  const { db, client } = await mongoConnect()
  const id = req.params.id

  try {
    const updatedApplePhone = await mongo.updateOne(db, 'apple-phone', { _id: ObjectId(id)}, {$set: req.body }, { upsert: true })
    res.status(200).json({ success: true, data: updatedApplePhone })
  } catch (error) {
    res.status(500).json({ success: false, data: { error }})
  } finally {
    await client.close()
  }
}

router.post('/apple', createApplePhone)
router.get('/apple', getApplePhone)
router.delete('/apple/:id', deleteApplePhone)
router.put('/apple/:id', updateApplePhone)

module.exports = router
