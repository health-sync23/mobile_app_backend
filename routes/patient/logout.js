const logoutPatient = require("../../handlers/patient/logout-handler");

const express = require("express");

// create router using express
const router = express.Router();

router.route("/").get(logoutPatient);

module.exports = router;
