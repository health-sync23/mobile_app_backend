const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { runEmailValidation } = require("../../utils/validation");

const Patient = require("../../models/Patient");

const loginPatient = async (req, res) => {
  // extract data from req body
  const { email, password } = req.body;

  console.log(req.body);

  //   check if data is not empty
  if (!email || !password)
    return res.status(400).json({ message: "Enter your email AND password!" });
  // make email lowercase incase and strip spaces
  const cleanEmail = email.toLowerCase().trim();

  const validMail = runEmailValidation(cleanEmail);

  if (!validMail)
    return res.status(400).json({ message: "invalid email format" });

  console.log(validMail);

  // check if user exist in database
  const user = await Patient.findOne({ email: cleanEmail }).exec();

  if (!user) {
    return res.status(404).json({ message: "User does not exist!" });
  } else {
    try {
      // check if the provided password and the user password matches
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch)
        return res.status(401).json({ message: "Invalid email OR password!" });

      // create access token for user
      const accessToken = jwt.sign(
        {
          userId: user._id,
          user: user.email,
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: "15m" }
      );
      // create refresh token for user
      const refreshToken = jwt.sign(
        {
          userId: user._id,
          user: user.email,
        },
        process.env.REFRESH_TOKEN,
        { expiresIn: "1d" }
      );

      //   update the users refresh token
      user.refreshToken = refreshToken;

      //   save user
      await user.save();

      //   send refresh token as cookie
      res.cookie("jwt", refreshToken, {
        sameSite: false,
        secure: true,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 10,
      });

      res.status(200).json({
        token: accessToken,
        message: "Login successful!",
        id: user._id,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

module.exports = { loginPatient };
