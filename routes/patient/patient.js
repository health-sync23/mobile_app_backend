const express = require("express");
const {
  getAllPatients,
  getPatientById,
} = require("../../handlers/patient/patient-handler");

// create router using express
const router = express.Router();

router.route("/").get(getAllPatients);
router.route("/:id").get(getPatientById);

module.exports = router;
