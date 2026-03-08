const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express();

/* When we want to allow cross-origin requests then we'll use cors middleware 
and axios doesn't store the cookies by-default so we need to store cookies/sth like that then we've to use 
credentials: true and with that we also need to give the origin/client-side-browser in where we want to store the 
cookies */
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))
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