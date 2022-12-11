const mongoose = require("mongoose");
require("dotenv").config()


const mongoUri = process.env.MONGO_URI;
const environment = process.env.ENVIRONMENT;

const connectToDb = () => {
  mongoose.connect(mongoUri, { useNewUrlParser: true }, (err) => {
    if (err) {
      if (environment !== "dev") {
        throw err;
      }
      mongoose.connect("mongodb://localhost:27017/blogDb", { useNewUrlParser: true }, (err) => {
        if (err) {
          throw err;
        }
        console.log("Connected to Local DB Successfully");

      })
    }
    else {
      console.log("Connected to ATLS DB Successfully");
    }
  })
}

module.exports = connectToDb;
