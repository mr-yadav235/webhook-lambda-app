const { Router } = require('express');
const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
console.log(process.env.DATABASE_URL);
const mongoString = process.env.DATABASE_URL;


mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

//MIDDLEWARE
const logger = require('./middleware/logger.js');
//app.use(logger);

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//SET TEMPLATE ROUTES
app.use(express.static(path.join(__dirname, 'public')));


//SET API ROUTES
app.use('/api/employees', require('./routes/api/employees'));
app.use('/api/merchants', require('./routes/api/merchants'));


PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
    console.log("SERVER STARTED ON PORT " + PORT)
});

