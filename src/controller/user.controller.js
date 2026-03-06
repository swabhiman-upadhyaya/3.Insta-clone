const followModel = require("../model/follow.model")
const userModel = require("../model/user.model")

async function followUserController(req, res) {

  const followerUsername = req.user.username  // who followed (kaun)
  const followeeUsername = req.params.username  // whom followed (kisko)

  /*checking whether someone trying to follow himself it's true then return */
  if (followerUsername === followeeUsername) {
    return res.status(400).json({
      message: "By the way You can't follow yourself!"
    })
  }

  /* checking whether the followee is Exist or not in the (userModel)/database 
  matlab jisko (loginned/registered) follow karna chaha rha hai wo (users collection/ userModel) mai hai ya nhi */
  const isUserAlreadyExist = await userModel.findOne({
    username: followeeUsername
  })
  if (!isUserAlreadyExist) {
    return res.status(404).json({
      message: `User with username ${followeeUsername} not found!`
    })
  }

  /* checking whether (one user already following another) and again sending the request */
  const isAlreadyFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername
  })
  // if the above is true then we return 
  if (isAlreadyFollowing) {
    return res.status(200).json({
      message: `You're already following ${followeeUsername}`,
      follow: isAlreadyFollowing
    })
  }

  /* Creating a new follow record */
  const followRecord = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername
  })



  res.status(200).json({
    message: `User ${followerUsername} started following ${followeeUsername}!`,
    followRecord: followRecord
  })

}

async function unfollowUserController(req, res) {

  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  const isUserFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername
  })

  if (!isUserFollowing) {
    return res.status(200).json({
      message: `You're not following ${followeeUsername}`
    })
  }

  await followModel.findByIdAndDelete(isUserFollowing._id)

  res.status(200).json({
    message: `You've unfollowed ${followeeUsername}`
  })
}

module.exports = {
  followUserController,
  unfollowUserController
}