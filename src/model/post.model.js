const mongoose = require("mongoose")

const postSchema = {
  caption: {
    type: String,
    default: ""
  },
  imgUrl: {
    type: String,
    required: [true, "imgUrl is required for creating an "]
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "user id is required for creating a post"]
  }
}

const postModel = mongoose.model("posts", postSchema)

module.exports = postModel;