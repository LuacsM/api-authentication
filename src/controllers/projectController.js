const express = require('express');
const authMiddleware = require('../middlewars/auth')

const router = express.Router();

router.use(authMiddleware);

router.get('/student', (req, res) =>{
    res.send({ok: true, user: req.userId});
});

module.exports = app => app.use('/projects', router)