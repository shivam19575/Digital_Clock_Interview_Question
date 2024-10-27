const mongoose = require("mongoose");

const URI =process.env.MONGODB_URI;

const connectDb = async() => {
  try {
    await mongoose.connect(URI);
    console.log("connection successful to database ");
  } catch (error) {
     console.error("connection failed ");
     process.exit(0);
  }
};



module.exports = connectDb;


