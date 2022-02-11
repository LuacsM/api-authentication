const mongoose = require('mongoose');

const response = process.env.MONGO_URL;
console.log(response)
mongoose.connect(response);
mongoose.Promise = global.Promise;

module.exports = mongoose;


