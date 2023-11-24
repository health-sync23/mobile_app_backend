const { verifyJWT } = require("./middlewares/verify-jwt");

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
app.use("/", require("./routes/root"));
app.use("/new-patient", require("./routes/patient/signup"));
app.use("/signin", require("./routes/patient/signin"));
app.use("/patient", require("./routes/patient/patient"));

app.use(verifyJWT);

app.use("/reminder", require("./routes/patient/reminder"));
// app.use("/reminders", require("./routes/patient/reminder"));

// start server once database is connected
mongoose.connection.once("open", () => {
  console.log(`Connected to database...`);
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
