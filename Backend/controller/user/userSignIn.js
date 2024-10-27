const bcrypt = require("bcryptjs");
const { UserModal } = require("../../models/userModel");
const jwt = require("jsonwebtoken");

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;
    if (!email) throw new Error("Please provide email");
    if (!password) throw new Error("Please provide password");

    const user = await UserModal.findOne({ email });
    if (!user) throw new Error("User not Found");

    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email
      };

      const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });
      const tokenOption = {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'None',
        maxAge: 30 * 24 * 60 * 60 * 1000  // 30 days in milliseconds
      };

      res.status(200).cookie("token", token, tokenOption).json({
        message: "Login Successfully",
        data: token,
        success: true,
        error: false
      });
    } else {
      res.status(401).json({
        message: "Please Check Password",
        error: true,
        success: false,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignInController;
