const mongoose = require("mongoose");
const dotenv = require("dotenv")


const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://manager:Pwd4321@applicationcluster.bvvimpq.mongodb.net/?retryWrites=true&w=majority",
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
