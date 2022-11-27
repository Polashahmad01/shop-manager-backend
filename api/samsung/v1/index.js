const router = require('express').Router()
const { ObjectId } = require('mongodb')

const mongo = require('../../../services/mongo-crud')
const mongoConnect = require('../../../config/mongo-connect')

createSamsungPhone = async (req, res, next) => {
  const { db, client } = await mongoConnect()

  try {
    const samsungPhone = await mongo.insertOne(db, 'samsung-phone', req.body)
    res.status(201).json({ success: true, data: samsungPhone })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, data: { error }})
  } finally {
    await client.close()
  }
}

getSamsungPhone = async (req, res, next) => {
  const { db, client } = await mongoConnect()

  try {
    const samsungPhone = await mongo.fetchMany(db, 'samsung-phone')
    res.status(200).json({ success: true, data: samsungPhone })
  } catch (error) {
    res.status(500).json({ success: false, data: { error }})
  } finally {
    await client.close()
  }
}

deleteSamsungPhone = async (req, res, next) => {
  const { db, client } = await mongoConnect()
  const id = req.params.id

  try {
    const samsungPhone = await mongo.deleteOne(db, 'samsung-phone', { _id: ObjectId(id)})
    res.status(200).json({ success: true, data: samsungPhone})
  } catch (error) {
    res.status(500).json({ success: false, data: { error }})
  } finally {
    await client.close()
  }
}

updateSamsungPhone = async (req, res, next) => {
  const { db, client } = await mongoConnect()
  const id = req.params.id

  try {
    const updatedSamsungPhone = await mongo.updateOne(db, 'samsung-phone', { _id: ObjectId(id)}, {$set: req.body }, { upsert: true })
    res.status(200).json({ success: true, data: updatedSamsungPhone })
  } catch (error) {
    res.status(500).json({ success: false, data: { error }})
  } finally {
    await client.close()
  }
}

router.post('/samsung', createSamsungPhone)
router.get('/samsung', getSamsungPhone)
router.delete('/samsung/:id', deleteSamsungPhone)
router.put('/samsung/:id', updateSamsungPhone)

module.exports = router