const {
  createReminder,
  getPatientReminders,
  getAllReminders,
} = require("../../handlers/patient/reminder-handler");

const express = require("express");

const router = express.Router();

router.route("/").get(getAllReminders).post(createReminder);
router.route("/:userId").get(getPatientReminders);

module.exports = router;
