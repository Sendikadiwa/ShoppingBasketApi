const express = require('express');
const app = express();
const connectMongoDb = require('./config/db');

// Db connection
connectMongoDb();

// init middleware
app.use(express.json({ extended: false }));

// define routes
app.use('/api/v1/users', require('./routes/api/users'));

module.exports = app;
