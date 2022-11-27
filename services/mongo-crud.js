module.exports = {
  async insertOne(db, collection, payload) {
    try {
      const response = await db.collection(collection).insertOne(payload)
      return response
    } catch (error) {
      console.error(error)
      return false
    }
  },

  async fetchMany(db, collection, query = {}, keys = {}, sorting = {}, limit = 0, pageNumber = 0) {
    try {
      const phoneName = await db.collection(collection).find(query).skip(pageNumber > 0 ? (pageNumber - 1) * limit : 0).limit(limit).sort(sorting).project(keys).toArray()
      return phoneName
    } catch (error) {
      console.log(error)
      console.error(error)
      return false
    }
  },

  async deleteOne(db, collection, query = {}) {
    try {
      const phoneName = await db.collection(collection).deleteOne(query)
      return phoneName
    } catch (error) {
      console.log(error)
      console.error(error)
      return false
    }
  },

  async updateOne(db, collection, query = {}, update = {}, options = {}) {
    try {
      const updatePhoneName = await db.collection(collection).updateOne(query, update, options)
      return updatePhoneName
    } catch (error) {
      console.log(error)
      console.error(error)
      return false
    }
  }
}