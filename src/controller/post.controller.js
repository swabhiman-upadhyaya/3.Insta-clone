const postModel = require("../model/post.model")

const jwt = require("jsonwebtoken")

const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const Imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostControler(req, res) {
  console.log(req.body, req.file);

  // To know which user is creating the post at first we need to verify whether the user is already registered or 
  // loginned which means the user must have allocated the token so......

  const jwt_token = req.cookies.jwt_token;

  if(!jwt_token) {
    return res.staus(401).json({
      message: "Token not provided, Unauthorized access"
    })
  }

  // if the user have the token then it can create the post so...
  
  // for creating the post we need to verify whether the token is "created by out server" so for that...
  let decoded;
  try {
    decoded = jwt.verify(jwt_token, process.env.JWT_SECRET);
  }catch(err) {
    return res.status(401).json({
      message: "User not authorized to create a post"
    })
  }
  
  // here we'll recieve all the thing we've created which we've given in the token to the user while register or login
  console.log(decoded)

  // if all these above will sathisfies then we'll first create the post in cloud and generate the link...
  const file = await Imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: req.file.originalname,
    folder: "insta-clone-posts"
  })

  // after generating the post link the we'll create the post and save it in the database so....
  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    userId: decoded.id
  })

  res.status(201).json({
    message: "Post created successfully",
    post
  })

}

module.exports = {
  createPostControler
}