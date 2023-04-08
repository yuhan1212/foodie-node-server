const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config({path: './.env'});

const DB_CONNECTION_URI = process.env.DB_CONNECTION_URI
|| 'mongodb://127.0.0.1:27017/foodi\e';

mongoose.connect(DB_CONNECTION_URI);

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

require("./services/user-service")(app);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});