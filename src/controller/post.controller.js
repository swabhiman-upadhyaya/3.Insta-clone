const postModel = require("../model/post.model")

const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const Imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostControler(req, res) {
  console.log(req.body, req.file);

  const file = await Imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: req.file.originalname
  })

  res.send(file)

}

module.exports = {
  createPostControler
}