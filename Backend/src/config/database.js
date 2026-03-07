const mongoose = require("mongoose")

async function connectToDb() {
  await mongoose.connect(process.env.MONGO_URI)

  console.log("Server is connected to MongoDB")
}

module.exports = connectToDb