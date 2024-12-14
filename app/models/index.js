const dbConfig = require('../../config/db_config')
const mongose = require('mongoose')

mongose.Promise = global.Promise

const db = {}
db.mongoose = mongose
db.url = dbConfig.url

module.exports = db