const express = require("express")

/* requiring "identifyUser" router => (by which we'll able to know which user is sending the request) */
const identifyUser = require("../middlewares/auth.middleware")

/* requiring "postController" routes => (where all the logic are there) */
const postController = require("../controller/post.controller")

/**
 * multer is a middleware for handling multipart/form-data, which is primarily used for uploading files.
 * In this code, we are configuring multer to use memory storage, which means that the uploaded files will be stored in memory as Buffer objects. 
 * This is useful when you want to process the files directly in your application without saving them to disk.
 */
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })

const postRouter = express.Router();

/*  Sequence of path in api router

  here in every api at first we'ld give the default address of the api after the addressing using by api.....

  then if we're using any (cloud service or anything external if it is using before the controller)
  to hamko uska path bhi dena rahega.....

  then after we've to use (identifyUser) function as it is reqd at first in our controller to verify which user is 
  sending the request....

  after all we'll use the controller that's it.....
*/

/**
 * @routes POST /api/post [protected]
 * @description Create a new post
 * @req.body = {caption, image-file}
 */
postRouter.post("/", upload.single("image"), identifyUser, postController.createPostControler)

/**
 * @routes GET /api/post [protected]
 * @description Get all posts of the user 
 */
postRouter.get("/", identifyUser, postController.getPostController)

/**
 * @routes GET /api/post/details/:id [protected]
 * @description Get details of a post by id (but the user who's requesting must be the owner of the post or his follower)
 */
postRouter.get("/details/:id", identifyUser, postController.getPostDetailsController)

/**
 * @routes POST /api/post/like/:postid
 * @description Like a post by PostId
 */
postRouter.post("/like/:postId", identifyUser, postController.likePostController)

/**
 * @routes POST /api/post/dislike/:postid
 * @description Disseapear/Dislike a post by postId
 */
postRouter.post("/dislike/:postId", identifyUser, postController.dislikePostController)

/**
 * @route GET /api/post/feed
 * @description To get all the resources of the user to show in the feed
 * @access Private
 */
postRouter.get("/feed", identifyUser, postController.getFeedController)

module.exports = postRouter;