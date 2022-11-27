const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()

const appleRoutes = require('./api/apple')
const pixelRoutes = require('./api/pixel')
const samsungRoutes = require('./api/samsung')

const PORT = process.env.PORT || 5001

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({ success: true, data: 'Server is running' })
})

app.use('/api', appleRoutes)
app.use('/api', pixelRoutes)
app.use('/api', samsungRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`)
})