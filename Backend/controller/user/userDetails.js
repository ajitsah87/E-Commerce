const { UserModal } = require("../../models/userModel.js")
async function userDetailsController(req, res) {
    try {
        console.log(req.userId)
            const user = await UserModal.findById(req.userId)
        // if (!user) {
        //     throw new Error("user not found")
        // }
        res.status(200).json({  
            data : user ,
            error : false ,
            success : true ,
            message : "user Details"
        })
    } catch (err) {
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false,
            message : "user details"
        })
    }
}
module.exports = userDetailsController