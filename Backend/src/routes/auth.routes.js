const express = require("express")
const authController = require("../controller/auth.controller");

const authRouter = express.Router();

// /api/auth/register
authRouter.post("/register", authController.registerController)

// /api/auth/login
authRouter.post("/login", authController.loginController)

module.exports = authRouter;