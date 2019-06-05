// Establish a connection to our mongoDB
const mongoose = require('mongoose');

// get mongoDB url string from the env variables
const db = process.env.MONGODB_URI;

// connect to mongoDb
const connectMongoDb = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('Connection successfull...');
  } catch (error) {
    console.error(error.message);
    // Exist process
    process.exit(1);
  }
};
module.exports = connectMongoDb;
