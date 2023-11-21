const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const patientSchema = new Schema({
  firstname: {
    type: "String",
    required: true,
  },
});

module.exports = mongoose.model("Patient", patientSchema);
