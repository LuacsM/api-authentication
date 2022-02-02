const express = require('express');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

const User = require('../models/user');

const router = express.Router();

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
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
        token: generateToken({id: user.id}),
    });

});

module.exports = app => app.use('/auth', router)
