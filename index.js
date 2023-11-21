const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const { connectDB } = require("./configs/connect-db");
const cookieParser = require("cookie-parser");

// create web server using express
const app = express();

// port
const PORT = process.env.PORT || 6000;

// establish database connection
connectDB();

// set middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// enpoints
app.use("/", require("./routers/root"));
app.use("/new-patient", require("./routers/patient/patient-router"));

// start server once database is connected
mongoose.connection.once("open", () => {
  console.log(`Connected to database...`);
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
