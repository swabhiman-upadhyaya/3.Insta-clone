const mongoose = require("mongoose")

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: String,
      required: [true, "Follower is required"]
    },
    followee: {
      type: String,
      required: [true, "Followee is required"]
    }
  },
  {
    timestamps: true
  },
)

const followModel = new mongoose.model("follows", followSchema);

module.exports = followModel;