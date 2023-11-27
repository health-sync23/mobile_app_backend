const Patient = require("../../models/Patient");

const logoutPatient = async (req, res) => {
  const cookies = req.cookies;

  // If there is no JWT token in cookies, return a successful status (204)
  if (!cookies?.jwt) {
    return res.sendStatus(401);
  }

  try {
    // Find the patient based on the refreshToken stored in cookies
    const patient = await Patient.findOne({ refreshToken: cookies.jwt });

    // If the patient is found, remove the refreshToken
    if (patient) {
      patient.refreshToken = null;
      await patient.save();
    }

    // Clear the refreshToken cookie
    res.clearCookie("jwt");

    // Return a successful status (204)
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = logoutPatient;
