const mongoose = require("mongoose")

const likeSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: [true, "The Post Id is required to like a Post"]
    },
    user: {
      type: String,
      required: [true, "Username/User is required to like a post"]
    }
  },
  {
    timestamps: true
  }
)

likeSchema.index({ post: 1, user: 1 }, { unique: true })

const likeModel = mongoose.model("likes", likeSchema);

module.exports = likeModel