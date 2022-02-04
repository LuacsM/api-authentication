const express = require('express');
const authMiddleware = require('../middlewars/auth')

const router = express.Router();
const User = require('../models/user');

router.use(authMiddleware);

router.get('/', (req, res) =>{
    res.send({ok: true, user: req.user});
});

router.get('/:studentId', async (req, res) =>{
    try{
        const student = await User.findById(req.params.studentId)
        return res.send({student});
    }catch(err){
        return res.status(400).send({error: 'Erro em carregar perfil'})
    }
});

router.put('/:studentId', async (req, res) =>{
    const {id} = req.params

    const student = await User.findByIdAndUpdate(req.params.studentId, req.body, {new: true})
    
    await student.save()

    res.send({
        message: "sucesso",
        student,
    })
   
});

module.exports = app => app.use('/projects', router)