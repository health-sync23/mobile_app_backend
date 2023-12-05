const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const { connectDB } = require("./configs/connect-db");
const cookieParser = require("cookie-parser");
const { requestLogger, errorLogger } = require("./middlewares/event-logger");
const { verifyJWT } = require("./middlewares/verify-jwt");
const cors = require("cors");

// create web server using express
const app = express();

// port
const PORT = process.env.PORT || 6000;

// establish database connection
connectDB();

app.use(requestLogger);

// set middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

// endpoints
app.use("/", require("./routes/root"));
app.use("/new-patient", require("./routes/patient/signup"));
app.use("/signin", require("./routes/patient/signin"));

app.use(verifyJWT);

app.use("/reminder", require("./routes/patient/reminder"));
app.use("/patient", require("./routes/patient/patient"));

app.use(errorLogger);

// start server once database is connected
mongoose.connection.once("open", () => {
  console.log(`Connected to database...`);
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});

process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB disconnected through app termination");
    process.exit(0);
  } catch (err) {
    console.error("Error during MongoDB disconnection:", err);
    process.exit(1);
  }
});

// Export the app
module.exports = { app };
