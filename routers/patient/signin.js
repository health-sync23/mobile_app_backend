const express = require("express");
const { loginPatient } = require("../../handlers/patient-login-handler");
// create router using express
const router = express.Router();

router.route("/").post(loginPatient);

module.exports = router;
