const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: [true, "User name already exist"],
    required: [true, "User name is required"]
  },
  email: {
    type: String,
    unique: [true, "Email already exist"],
    required: [true, "Email is required"]
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  bio: String,
  profileImage: {
    type: String,
    default: "https://ik.imagekit.io/tvv2v50gn/default_user_image.jpg"
  }
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel