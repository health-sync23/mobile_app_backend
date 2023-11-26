import { clientError, resourceNotFound } from "../../utils/returnError";

const Patient = require("../../models/Patient");
const { serverError } = require("../../utils/returnError");

const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json({ patients });
  } catch (error) {
    console.log(error);
    serverError(res);
  }
};

const getPatientById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await Patient.findOne({ _id: userId }).exec();
    if (!user) return resourceNotFound(res, "User not found!");
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    serverError(res);
  }
};

module.exports = { getAllPatients, getPatientById };
