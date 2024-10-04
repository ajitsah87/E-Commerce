const { UserModal } = require("../../models/userModel");
const bcrypt = require("bcryptjs");

//fields to be validated;
async function userSignUpController(req, res) {
  try {
    const { email, password, name } = req.body;
    const user = await UserModal.findOne({ email });
    if (user) {
      throw new Error("Already user exits");
    }
    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }
    if (!name) {
      throw new Error("Please provide name");
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Something is wrong");
    }
    const payload = {
      ...req.body,
      role: "GENERAL",
      password: hashPassword,
    };

    const userData = new UserModal(payload);
    const savedUser = await userData.save();

    // const savedUser = await UserModal.create(payload);

    console.log(savedUser);

    res.status(201).json({
      data: savedUser,
      success: true,
      error: false,
      message: "User Create Successfully!",
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
