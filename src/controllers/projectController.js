const express = require('express');
const authMiddleware = require('../middlewars/auth')

const router = express.Router();
const User = require('../models/user');

router.use(authMiddleware);

router.get('/', (req, res) =>{
    res.send({ok: true, user: req.user});
});

router.put('/:studentId', async (req, res) =>{
    const {id} = req.params

    const student = await User.findByIdAndUpdate(req.params.studentId, req.body, {new: true})
    
    res.send({
        message: "sucesso",
        student,
    })
    res.send({student});
});

module.exports = app => app.use('/projects', router)