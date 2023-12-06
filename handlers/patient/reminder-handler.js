const Patient = require("../../models/Patient");
const { resourceNotFound } = require("../../utils/returnError");
const Reminder = require("../../models/Reminder");
const { clientError, serverError } = require("../../utils/returnError");

const createReminder = async (req, res) => {
  const { drugName, drugType, dosage, frequency, time, note } = req.body;
  const { userId } = req.user;

  if (!drugName || !drugType || !dosage || !frequency || !time || !note)
    return res
      .status(400)
      .json({ message: "Important fields cannot be empty!" });

  const user = await Patient.findOne({ _id: userId });
  if (!user) return res.status(404).json({ message: "User not found!" });

  try {
    const newReminder = {
      patient: userId,
      drug_name: drugName,
      drug_type: drugType,
      dosage: dosage,
      reminder_frequency: frequency,
      time: time,
      note: note,
    };

    await Reminder.create(newReminder);

    res
      .status(201)
      .json({ message: `New drug ${drugName} alert created successfully!` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occured!" });
  }
};

const getPatientReminders = async (req, res) => {
  const loggedInUserId = req.user.userId;
  const { userId } = req.params;

  console.log(`logged: ${loggedInUserId}`);
  console.log(`req: ${userId}`);

  // Validate that the logged-in user is the same as the requested user
  if (loggedInUserId !== userId) {
    return res.status(403).json({
      message: "Access forbidden. You can only retrieve your own reminders.",
    });
  }

  try {
    const patientReminders = await Reminder.find({
      patient: loggedInUserId,
    }).exec();

    if (!patientReminders) {
      return res.status(404).json({ message: "Invalid patient ID" });
    } else if (patientReminders.length === 0) {
      return res.status(200).json({ message: "You have no reminder" });
    }

    res.status(200).json({ patientReminders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occured!" });
  }
};

const getAllReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find();

    if (reminders.length) {
      res.status(200).json({ reminders });
    } else {
      res.status(200).json({ message: "You have no reminder." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occured!" });
  }
};

module.exports = { createReminder, getPatientReminders, getAllReminders };
