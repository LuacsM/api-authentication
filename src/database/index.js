const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://lucas_maia:1234@cluster0.d9pho.mongodb.net/uploadInfos?retryWrites=true&w=majority' || 'mongodb://localhost/noderest', {useNewUrlParser: true}, () => 
    console.log("Connected to database!")
);


mongoose.Promise = global.Promise;

module.exports = mongoose;