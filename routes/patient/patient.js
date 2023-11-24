const express = require("express");
const { getAllPatients } = require("../../handlers/patient/patient-handler");
// create router using express
const router = express.Router();

router.route("/").get(getAllPatients);

module.exports = router;
