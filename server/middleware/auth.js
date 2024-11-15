const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    const authorizationHeader = req.headers["authorization"]?.split(" ")[1];

    const token = authorizationHeader || req.body.token;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SCERET);

      req.user = decode;
    } catch (err) {
      console.log(err.message);
      console.log(err);
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }

    next();
  } catch (err) {
    console.log(err);
    console.log(err.message);
    return res.status(401).json({
      success: false,
      message: "User not authenticated",
      body: req.body,
    });
  }
};
