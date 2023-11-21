const mongoose = require("mongoose");

const DATABASE_URI = process.env.URI;

const connectDB = async () => {
  await mongoose.connect(DATABASE_URI);
};

module.exports = { connectDB };
