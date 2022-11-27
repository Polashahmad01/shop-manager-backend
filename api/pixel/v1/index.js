const router = require('express').Router()
const { ObjectId } = require('mongodb')

const mongo = require('../../../services/mongo-crud')
const mongoConnect = require('../../../config/mongo-connect')

createPixelPhone = async (req, res, next) => {
  const { db, client } = await mongoConnect()

  try {
    const pixelPhone = await mongo.insertOne(db, 'pixel-phone', req.body)
    res.status(201).json({ success: true, data: pixelPhone })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, data: { error }})
  } finally {
    await client.close()
  }
}

getPixelPhone = async (req, res, next) => {
  const { db, client } = await mongoConnect()

  try {
    const pixelPhone = await mongo.fetchMany(db, 'pixel-phone')
    res.status(200).json({ success: true, data: pixelPhone })
  } catch (error) {
    res.status(500).json({ success: false, data: { error }})
  } finally {
    await client.close()
  }
}

deletePixelPhone = async (req, res, next) => {
  const { db, client } = await mongoConnect()
  const id = req.params.id

  try {
    const pixelPhone = await mongo.deleteOne(db, 'pixel-phone', { _id: ObjectId(id)})
    res.status(200).json({ success: true, data: pixelPhone})
  } catch (error) {
    res.status(500).json({ success: false, data: { error }})
  } finally {
    await client.close()
  }
}

updatePixelPhone = async (req, res, next) => {
  const { db, client } = await mongoConnect()
  const id = req.params.id

  try {
    const updatedPixelPhone = await mongo.updateOne(db, 'pixel-phone', { _id: ObjectId(id)}, {$set: req.body }, { upsert: true })
    res.status(200).json({ success: true, data: updatedPixelPhone })
  } catch (error) {
    res.status(500).json({ success: false, data: { error }})
  } finally {
    await client.close()
  }
}

router.post('/pixel', createPixelPhone)
router.get('/pixel', getPixelPhone)
router.delete('/pixel/:id', deletePixelPhone)
router.put('/pixel/:id', updatePixelPhone)

module.exports = router
