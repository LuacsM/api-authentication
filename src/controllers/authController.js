const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv/config');

const User = require('../models/user');

const router = express.Router();

function generateToken(params = {}){
    return jwt.sign(params, process.env.SECRET_KEY, {
        expiresIn: 1800,
    });
}

router.post('/register', async (req, res) => {
    const {matricula} = req.body;


    try {
        if(await User.findOne({matricula}))
            return res.status(400).send({error: 'Este usuário já existe'})


        const user = await User.create(req.body);

        return res.send({user});
    } catch (err){
        return res.status(400).send({error: 'Registration failed'});
    }
});


router.post('/authenticate', async (req, res) =>{
    const {matricula, age} = req.body;
    const user = await User.findOne({matricula});

    if(!user)
        return res.status(400).send({error: 'Usuáio não existe'});

    if(age !== user.age)
        return res.status(400).send({error: 'Data Inválida'});


    res.send({
        user, 
        token: generateToken({user: user}),
    });

});

router.post('/check-token', async(req, res) =>{
    const {token} = req.body
    const SECRET_KEY = process.env.SECRET_KEY
    console.log(token)
    if(!SECRET_KEY){
        return res.json({status: false})
    }

    try{
        if(token){
            jwt.verify(token, SECRET_KEY)
            ? res.json({status: true})
            : res.json({status: false})
        }else{
            return res.json({status: false})
        }
    }catch (error){
        return res.json({status: false})
    }

})

module.exports = app => app.use('/auth', router)
