const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token);
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // console.log(decoded);
    req.AuthCheck = decoded;
    next();
  } catch (e) {
    console.log(e);
    res.status(401).json({
      status: "fail",
      message: "Auth failed",
    });
  }
};
