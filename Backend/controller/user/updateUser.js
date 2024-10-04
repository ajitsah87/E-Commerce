const { UserModal } = require("../../models/userModel")

 async function updateUser(req, res){
    try {
        const sessionUser = req.userId
        const {userId, email , name , role  } = req.body
        const payload = {
            ...(email && {email : email}),
            ...(name && {name : name}),
            ...(role && {role : role}),
        }
        const user = await UserModal.findById(sessionUser)
        console.log("user.role", user.role)
        const updatedUserData = await UserModal.findByIdAndUpdate(userId, payload, {new: true})
        console.log("update userrrrrrr", updatedUserData)
        res.json({
            data : updatedUserData,
            message : "User Updated",
            success : true,
            error : false
        })
    } catch (err) {
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false,
        })
    }
} 

module.exports = updateUser


