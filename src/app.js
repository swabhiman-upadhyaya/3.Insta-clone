const express = require("express")
const authRouter = require("./routes/auth.routes")
const cookieParser = require("cookie-parser")
const postRouter = require("./routes/post.routes")


const app = express();

app.use(express.json())
app.use(cookieParser())


app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);

module.exports = app