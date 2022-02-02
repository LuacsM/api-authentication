const mongoose = require('../database');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    matricula: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: String,
        required: true,
    },
    
    nameMother: String,
    cpf: String,
    tel: String,
    tel2: String,
    cep: String,
    address: String,
    numHouse: String,
    city: String,
    district: String,
    complement: String,
    email: String,
})

const User = mongoose.model('User', UserSchema);

module.exports = User;