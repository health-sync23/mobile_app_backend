const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const eventLogger = async (message, logName) => {
  const currentDate = format(new Date(), "yyyy/MM/dd\tHH:mm:ss");
  const logItem = `${currentDate}\t${uuid()}\t${message}\n`;

  console.log(logItem);

  const logFolder = path.join(__dirname, "..", "logs");

  const filePath = path.join(logFolder, logName);

  try {
    if (!fs.existsSync(logFolder)) {
      await fsPromises.mkdir(logFolder);
    }
    await fsPromises.appendFile(filePath, logItem);
  } catch (error) {
    console.error(`Error appending to log file ${filePath}: ${error}`);
  }
};

const requestLogger = (req, res, next) => {
  eventLogger(
    `${req.method}\t${req.url}\t${req.headers.origin}`,
    "requests.txt"
  );
  next();
};

const errorLogger = (err, req, res, next) => {
  eventLogger(`${err.name}\t${err.message}\t${err.stack}`, "error.txt");
  next();
};

module.exports = { eventLogger, requestLogger, errorLogger };
