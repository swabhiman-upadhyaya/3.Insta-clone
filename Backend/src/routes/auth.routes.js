const express = require("express")
const authController = require("../controller/auth.controller");
const identifyUser = require("../middlewares/auth.middleware");

const authRouter = express.Router();

/* /api/auth/register */
authRouter.post("/register", authController.registerController)

/* /api/auth/login */
authRouter.post("/login", authController.loginController)

/**
 * @route GET /api/auth/get-me
 * @desc Get the currently authenticated user's information
 * @access Private (requires authentication)
 */
authRouter.get("/get-me", identifyUser, authController.getMeController)

module.exports = authRouter;