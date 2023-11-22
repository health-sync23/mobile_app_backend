const express = require("express");
const { enrollNewPatient } = require("../../handlers/patient/enroll-handler");
// create router using express
const router = express.Router();

router.route("/").post(enrollNewPatient);

module.exports = router;
