const { UserModal } = require("../../models/userModel");

async function allUsers(req, res) {
  try {
    const allUsers = await UserModal.find();
    console.log("userId all user", req.userId);
    res.json({
      message: "All user details",
      data: allUsers,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}
module.exports = allUsers;
