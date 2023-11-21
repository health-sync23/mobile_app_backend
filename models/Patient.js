const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// patient schema
const patientSchema = new Schema({
  fullname: {
    type: "String",
    required: true,
  },
  email: {
    type: "String",
    required: true,
  },
  password: {
    type: "String",
    required: true,
  },
  profile_pic: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("Patient", patientSchema);
