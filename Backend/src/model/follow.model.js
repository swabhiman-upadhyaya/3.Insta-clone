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
    },
/*     status: {
      type: String,
      default: Pending,
      enum: {
        values: ["Pending", "Accepted", "Rejected"],
        message: "Status can only be Pending, Accepted or Rejected"
      }
    } */
  },
  {
    timestamps: true
  },
)

// ensuring no user can be able to follow another user again and again
followSchema.index(
  {
    follower: 1,
    followee: 1
  },
  {
    unique: true
  }
)

const followModel = new mongoose.model("follows", followSchema);

module.exports = followModel;