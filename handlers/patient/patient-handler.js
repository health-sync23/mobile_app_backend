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

module.exports = { getAllPatients };
