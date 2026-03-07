const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    default: ""
  },
  imgUrl: {
    type: String,
    required: [true, "imgUrl is required for creating an "]
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "user id is required for creating a post"]
  }
})

const postModel = mongoose.model("posts", postSchema)

module.exports = postModel;