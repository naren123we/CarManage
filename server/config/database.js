const mongoose = require("mongoose");
require("dotenv").config();

const dbconnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connection established");
    })
    .catch((err) => {
      console.log("error");
      console.log(`${err.message}`);
      process.exit(1);
    });
};

module.exports = dbconnect;
