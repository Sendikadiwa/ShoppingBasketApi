const express = require('express');
const app = express();
const connectMongoDb = require('./config/db');

// Db connection
connectMongoDb();

// init middleware
app.use(express.json({ extended: false }));

// define routes
app.use('/api/v1/users', require('./routes/api/users'));
app.use('/api/v1/auth', require('./routes/api/auth'));
app.use('/api/v1/basket', require('./routes/api/basket'));

module.exports = app;
