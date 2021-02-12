module.exports = {
  up(db) {
    return db.collection('books').createIndex({event_id: 1 })
  },

  down(db) {
  },
}
