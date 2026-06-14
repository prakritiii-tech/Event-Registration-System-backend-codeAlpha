const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  console.log("HEADERS =", req.headers);
  console.log("AUTH =", req.headers.authorization);

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      req.user = await User.findById(decoded.id).select("-password");

      return next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        message: "Invalid Token",
      });
    }
  }

  return res.status(401).json({
    message: "No Token",
  });
};

module.exports = protect;