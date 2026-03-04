const express = require("express")
const cookieParser = require("cookie-parser")

const app = express();

app.use(express.json())
app.use(cookieParser())

/* requiring routes */
const authRouter = require("./routes/auth.routes")
const postRouter = require("./routes/post.routes")
const userRouter = require("./routes/user.routes")


/* using routes by giving prefix */
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/user", userRouter);

module.exports = app