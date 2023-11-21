const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const { connectDB } = require("./configs/connect-db");

// create web server using express
const app = express();

// port
const PORT = process.env.PORT || 6000;

// establish database connection
connectDB();

// start server once database is connected
mongoose.connection.once("open", () => {
  console.log(`Connected to database...`);
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
