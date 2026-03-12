const postModel = require("../model/post.model")

// requiring ImageKit
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const likeModel = require("../model/like.model");

// Initializing ImageKit
const Imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

// Api to create the post
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

/* feature: for private account
  Here we'll fetch the post details which requesting by the user who created the same
  if the post isn't created that user than we will tell "Access Denied" 
*/
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

/* To like a Post */
async function likePostController(req, res) {

  const username = req.user.username;
  const postId = req.params.postId;

  const post = await postModel.findById(postId)
  if (!post) {
    return res.status(404).json({
      message: "Post not found"
    })
  }

  const isAlreadyLiking = await likeModel.findOne(
    {
      user: username,
      post: postId
    }
  )
  if (isAlreadyLiking) {
    return res.status(409).json({
      message: `You're already liking this post`
    })
  }

  const like = await likeModel.create({
    post: postId,
    user: username
  })

  return res.status(201).json({
    message: "Post liked successfully",
    like
  })
}

// To disspear/dislike a post
async function dislikePostController(req, res) {

  const username = req.user.username;
  const postId = req.params.postId;

  const isUserLiking = await likeModel.findOne(
    {
      user: username,
      post: postId
    }
  )

  if (!isUserLiking) {
    return res.status(200).json({
      message: `You didn't even liked this post`
    })
  }

  await likeModel.findByIdAndDelete(isUserLiking._id);

  res.status(200).json({
    message: `You're not liking this post anymore`
  })
}

// To get the feed of the user
async function getFeedController(req, res) {

  // logged in user (comes from auth middleware)
  const user = req.user;

  /* find all posts from DB
     populate("user") → bring all the user data who created the post
     lean() → convert mongoose document to normal JS object so we can modify it */
  const posts = await postModel.find({}).sort({ _id: -1 }).populate("user").lean();

  /* "map with async" returns an array of promises so
     Promise.all() resolves all of them and gives final array */
  const updatedPosts = await Promise.all(

    posts.map(async (post) => {

      /* check if the current logged in user has liked this post */
      const isLiked = await likeModel.findOne({
        user: user.username,
        post: post._id
      });

      /* convert result to true / false
         if like document exists → true
         if not → false */
      post.isLiked = Boolean(isLiked);

      return post; // return modified post object
    })

  );

  res.status(200).json({
    message: "All Posts fetched successfully",
    posts: updatedPosts // send posts with isLiked property
  });
}

module.exports = {
  createPostControler,
  getPostController,
  getPostDetailsController,
  likePostController,
  dislikePostController,
  getFeedController
}