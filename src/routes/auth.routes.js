const express = require("express")
const userModel = require("../model/user.model")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

const authRouter = express.Router();

// /api/auth/register
authRouter.post("/register", async (req, res) => {
  const { email, username, password, bio, profileImage } = req.body;

  const isUserAlreadyExist = await userModel.findOne({
    $or: [
      { email },
      { username }
    ]
  })

  if(!email) {
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

  const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

  const user = await userModel.create({
    username,
    email,
    bio,
    profileImage,
    password: hashedPassword
  })

  const token = jwt.sign(
    {
      id: user._id
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

})

// /api/auth/login
authRouter.post("/login", async (req, res) => {
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
  })

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    })
  }

  const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

  const isPasswordValid = hashedPassword == user.password

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid Password (missing credentials)"
    })
  }

  const token = jwt.sign(
    {
      id: user._id
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

})

module.exports = authRouter;