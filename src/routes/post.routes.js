const express = require("express")
const postController = require("../controller/post.controller")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })
const identifyUser = require("../middlewares/auth.middleware")


const postRouter = express.Router();

/*  Sequence of path in api router

  here in every api at first we'ld give the default address of the api after the addressing using by api.....

  then if we're using any (cloud service or anything external if it is using before the controller)
  to hamko uska path bhi dena rahega.....

  then after we've to use (identifyUser) function as it is reqd at first in our controller to verify which user is 
  sending the request....

  after all we'll use the controller that's it.....
*/

// /api/post/
postRouter.post("/", upload.single("image"), identifyUser, postController.createPostControler)

// /api/post
postRouter.get("/", identifyUser, postController.getPostController)

// /api/post/details/userId
postRouter.get("/details/:id", identifyUser, postController.getPostDetailsController)

module.exports = postRouter;