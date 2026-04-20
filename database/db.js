const mongoose = require("mongoose");


const dbConnection = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error("MONGODB_URI is not defined in .env");
    }

    const connection = await mongoose.connect(uri);

    console.log(`Database connected: ${connection.connection.host}`);

  } catch (error) {
    console.error("Connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = dbConnection