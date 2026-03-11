const userModel = require("../model/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// REGISTER API......
async function registerController(req, res) {
  const { email, username, password, bio, profileImage } = req.body;

  const isUserAlreadyExist = await userModel.findOne({
    $or: [
      { email },
      { username }
    ]
  })

  if (!email) {
    return res.status(400).json({
      message: "Email is required to register"
    })
  }

  if (isUserAlreadyExist) {
    return res.status(409).json({
      message: "User Already exist: " + (isUserAlreadyExist.email == email
        ? "Email already exists" : "Username already exists")
    })
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    bio,
    profileImage,
    password: hashedPassword
  })

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )

  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "User registered and account created successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage
    }
  })

}

// LOGIN API..........
async function loginController(req, res) {
  const { username, email, password } = req.body;

  // feature: user can login based on username/email & password
  const user = await userModel.findOne({
    $or: [
      {
        username: username
      },
      {
        email: email
      }
    ]
  }).select("+password") 
  /* select("+password" brings the password accding to the user as in the schema password is selected to be false 
  which means password doesn't come by-default 
  (because it is reqd to compare the user password in the time of login from the db password) */

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid Password (Unauthorized access)"
    })
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )

  res.cookie("jwt_token", token);

  res.status(200).json({
    message: "User loggedIn Successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage
    }
  })

}

/* GET ME API */
async function getMeController(req, res) {
  const userId = req.user.id

  const user = await userModel.findById(userId)

  res.status(200).json({
    message: "Your details is fetched successfully",
    user
  })
}

module.exports = {
  registerController,
  loginController,
  getMeController
}