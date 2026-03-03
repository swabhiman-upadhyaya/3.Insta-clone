const postModel = require("../model/post.model")

const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

// const jwt = require("jsonwebtoken")


const Imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

// Api to create the post...
async function createPostControler(req, res) {

  // from the (identifyUser fnc / req.user) we'll recieve all the thing which we've given in the token to the user 
  // while register or login

  // if all these above will sathisfies then we'll first create the post in cloud and generate the link...
  const file = await Imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: req.file.originalname,
    folder: "insta-clone-posts"
  })

  // after generating the post link the we'll create the post and save it in the database......
  const userId = req.user.id;
  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: userId
  })

  res.status(201).json({
    message: "Post created successfully",
    post
  })

}


// Get all the post created by the same user which is currently logged in
async function getPostController(req, res) {

  const userId = req.user.id;

  // it'll fetch all the post created by the user according to the userId
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


  const userId = req.user.id;  // objectId
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

  if (!isValidUser) {
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