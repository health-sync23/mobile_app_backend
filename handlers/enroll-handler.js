const Patient = require("../models/Patient");
const bcrypt = require("bcryptjs");

const enrollNewPatient = async (req, res) => {
  // extract sent data from request body
  const { fullname, email, password } = req.body;

  //   check if the correct data is being sent
  if (!fullname || !email || !password)
    return res
      .status(400)
      .json({ message: "Important fields cannot be empty!" });

  //   check for email duplicate
  const duplicateEmail = await Patient.findOne({ email }).exec();
  if (duplicateEmail)
    return res.status(409).json({ message: "Email already exist!" });

  try {
    // hash password
    const hashedPass = await bcrypt.hash(password, 10);

    // create patient object
    const newPatient = {
      fullname: fullname,
      email: email,
      password: hashedPass,
      profile_pic: null,
      refreshToken: null,
    };

    // save new patient to db
    await Patient.create(newPatient);

    // return success response
    res
      .status(201)
      .json({ message: "New patient created successfully!", data: newPatient });
  } catch (error) {
    // if there are any errors return error response
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occured. Please try again later" });
  }
};

module.exports = { enrollNewPatient };
