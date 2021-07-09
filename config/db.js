const mongoose = require("mongoose");
require('dotenv').config()
const db = process.env.mongoURI

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })

    console.log("Successfully conntected to the DB");
  } catch (error) {
    console.log(error.message);
    process.exit(1)
  }
}


module.exports = connectDB