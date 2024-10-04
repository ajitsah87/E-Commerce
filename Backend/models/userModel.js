const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name : String ,
    email : {
        type : String,
        unique : true ,
    },
    password: String,
    profilePic : String,
    role : String,
},{
timestamps : true

})

const UserModal = mongoose.model("user", userSchema)

module.exports = {UserModal}