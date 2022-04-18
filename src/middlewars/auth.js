const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json');


module.exports = (req, res, next) =>{
    const authHeader = req.headers.authorization;
    

    if(!authHeader)
        return res.status(401).send({error: 'O token não foi informado'});
    
    const parts = authHeader.split(' ');

    if(!parts.length === 2)
        return res.status(401).send({error: 'Token error'});

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({error: 'Token malformatted'})
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if(err) return res.status(401).send({error: 'Token Inválido'})

        req.user = decoded.user;
        
        return next();
    });
        
};