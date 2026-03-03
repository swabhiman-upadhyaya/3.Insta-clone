const jwt = require("jsonwebtoken")

async function identifyUser(req, res, next) {
  // To know which user is creating the post at first we need to verify whether the user is already registered or 
  // loginned which means the user must have allocated the token so......

  const token = req.cookies.jwt_token;

  if (!token) {
    return res.status(401).json({
      message: "Token is not allocated Unauthorized access"
    })
  }

  // if the user have the token then it can create the post so...
  // for creating the post we need to verify whether the token is "created by out server" so for that...
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or Wrong token Unauthorized access"
    })
  }

  // as we always recieve decoded in form of object from the token so we've to save it as a token
  // so here we're saving the "decoded" in (property as user inside req)
  req.user = decoded;

  // to forward the whole (req.user) object from middleware to controller for that we're using next();
  next()
}

module.exports = identifyUser