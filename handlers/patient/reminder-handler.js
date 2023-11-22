const Reminder = require("../../models/Reminder");

const createReminder = async (req, res) => {
  const { drugName, drugType, dosage, frequency, time, note } = req.body;
};

module.exports = { createReminder };
