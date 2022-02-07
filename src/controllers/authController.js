const express = require('express');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

const User = require('../models/user');

const router = express.Router();

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
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
    const SECRET_KEY = authConfig.secret
    if(!SECRET_KEY){
        return res.status(401).json({error: 'Token inválido'})
    }

    try{
        if(token){
            jwt.verify(token), SECRET_KEY
            ? res.json({status: true})
            : res.json({status: false})
        }else{
            return res.json({status: false})
        }
    }catch (error){
        return res.status(500).json({error: 'jwt.verify'})
    }

})

module.exports = app => app.use('/auth', router)
