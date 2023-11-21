const express = require("express");
const path = require("path");

// create router using express
const router = express.Router();

// GET /index.html
router.get("/", (req, res) => {
  const filePath = path.join(__dirname, "../views/index.html");
  res.sendFile(filePath);
});

module.exports = router;
