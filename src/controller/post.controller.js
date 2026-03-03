const postModel = require("../model/post.model")

const jwt = require("jsonwebtoken")

const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const Imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

// Post Creation api - Controller
async function createPostControler(req, res) {

  // To know which user is creating the post at first we need to verify whether the user is already registered or 
  // loginned which means the user must have allocated the token so......

  const jwt_token = req.cookies.jwt_token;

  if (!jwt_token) {
    return res.status(401).json({
      message: "Token not provided, Unauthorized access"
    })
  }

  // if the user have the token then it can create the post so...

  // for creating the post we need to verify whether the token is "created by out server" so for that...
  let decoded;
  try {
    decoded = jwt.verify(jwt_token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: "User not authorized to create a post"
    })
  }

  // here we'll recieve all the thing we've created which we've given in the token to the user while register or login

  // if all these above will sathisfies then we'll first create the post in cloud and generate the link...
  const file = await Imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: req.file.originalname,
    folder: "insta-clone-posts"
  })

  // after generating the post link the we'll create the post and save it in the database so....
  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: decoded.id
  })

  res.status(201).json({
    message: "Post created successfully",
    post
  })

}


// Get Post according to each user - Controller
async function getPostController(req, res) {
  const token = req.cookies.jwt_token;

  if (!token) {
    return res.status(401).json({
      message: "Token is not allocated Unauthorized access"
    })
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  }
  catch (err) {
    return res.status(401).json({
      message: "Invalid or Wrong token"
    })
  }

  const userId = decoded.id;

  const posts = await postModel.find({
    user: userId
  })

  res.status(200).json({
    message: "Posts fetched Successfully",
    posts
  })
}


// feature: for private account
// Here we'll fetch the post details which requesting by the user who created the same
// if the post isn't created that user than we will tell "Access Denied"
async function getPostDetailsController(req, res) {
  const token = req.cookies.jwt_token;

  if (!token) {
    return res.status(401).json({
      message: "Token is not allocated Unauthorized access"
    })
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  }
  catch (err) {
    return res.status(401).json({
      message: "Invalid or Wrong token Unauthorized access"
    })
  }

  const userId = decoded.id;  // objectId
  const postId = req.params.id; // objectId

  const postsCreatedByTheSameUser = await postModel.findById(postId)

  if (!postsCreatedByTheSameUser) {
    return res.status(404).json({
      message: "No post is created from this user"
    })
  }

  // (here we're checking whether the post which is in Db is created by the user which is asking to access it)
  // postsCreatedByTheSameUser.user === userId 
  // (both of these are objectId but one is 1st one is refer type and 2nd one is not so we'll convert 1st one to string)
  const isValidUser = postsCreatedByTheSameUser.user.toString() === userId

  if(!isValidUser) {
    return res.status(403).json({
      message: "Sorry you're trying access the post of another user (Forbidden Request)"
    })
  }

  return res.status(200).json({
    message: "Post fetched successfully!",
    postsCreatedByTheSameUser
  })
}

module.exports = {
  createPostControler,
  getPostController,
  getPostDetailsController
}