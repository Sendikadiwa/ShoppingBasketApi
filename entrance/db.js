const mongoose = require("mongoose");
const config = require("config");

module.exports = async () => {
  const db = config.get("db");
  await mongoose.connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
  console.log(`Connected to ${config.get("db")}...`);
};
