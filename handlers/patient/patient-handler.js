const Patient = require("../../models/Patient");

const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json({ patients });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPatientById = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  try {
    const user = await Patient.findOne({ _id: userId }).exec();
    if (!user) return res.status(404).json({ message: "User not found!" });
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getAllPatients, getPatientById };
