const mongoose = require("mongoose");
const { format } = require("date-fns");

const Schema = mongoose.Schema;

const reminderSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  drug_name: {
    type: String,
    required: true,
  },
  drug_type: {
    type: String,
    required: true,
  },
  dosage: {
    type: String,
    required: true,
  },
  reminder_frequency: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  status: {
    type: String,
    default: "active",
  },
  created_at: {
    type: String,
    default: () => format(new Date(), "yyyy/MM/dd"),
  },
});

module.exports = mongoose.model("Reminder", reminderSchema);
