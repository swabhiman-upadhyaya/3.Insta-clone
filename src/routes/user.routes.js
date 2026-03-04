const express = require("express")

const identifyUser = require("../middlewares/auth.middleware")
const userController = require("../controller/user.controller")

const userRouter = express.Router();


/**
 * @route POST /api/user/follow/:username
 * @description To follow a user
 * @access Private
 */
userRouter.post("/follow/:username", identifyUser, userController.followUserController)

module.exports = userRouter