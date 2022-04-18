const mongoose = require('mongoose');
require('dotenv/config');

mongoose.connect(process.env.MONGO_DB_URL);
mongoose.Promise = global.Promise;

module.exports = mongoose;


