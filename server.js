const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config({path: './.env'});

const DB_CONNECTION_URI = process.env.DB_CONNECTION_URI
|| 'mongodb+srv://5610sp:3g41mnRh501uijHy@foodie.pw5nsle.mongodb.net/foodie?retryWrites=true&w=majority';

mongoose.connect(DB_CONNECTION_URI);

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
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

require("./controllers/user-controller")(app);
require("./controllers/favorite-controller")(app)
require("./controllers/dislike-controller")(app)
require("./controllers/review-controller")(app)

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});