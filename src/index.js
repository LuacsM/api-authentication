const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const { response } = require('express');
require('dotenv').config()

const app = express();

const allowedOrigins = [
    'https://frontend-app-seduc.herokuapp.com',
    'http://localhost:3000/',
    'http://172.16.3.254:3000/'
]

//habilita CORS
app.use(cors({
    origin: function(origin, callback){
        let allowed = true

        if(!origin) allowed = true

        if(!allowedOrigins.includes(origin)) allowed = false

        callback(null, allowed)
    }
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./controllers/authController')(app);
require('./controllers/projectController')(app);


app.listen(process.env.PORT);
