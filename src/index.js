const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors')

const app = express();


const allowedOrigins = [
    'http://127.0.0.1:5500', 
    'http://localhost:3001',
    'http://192.168.218.124:3000',
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


app.listen(8080);
