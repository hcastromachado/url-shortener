const mongoose = require("mongoose");
const dotenv = require("dotenv")


const connectDB = async () => {
  try {
    await mongoose.connect(
      "Your MongoDB Connection",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Database Connected!");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
