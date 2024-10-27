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


// mongodb+srv://shivam19575:shivampandey19575@cluster0.loml0ra.mongodb.net/Clock?retryWrites=true&w=majority&appName=Cluster0