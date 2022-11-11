const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../../../models/userModel");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const checkToken = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [tokenType, token] = authorization.split(" ");

  if (tokenType !== "Bearer" || token === "") {
    next(new Unauthorized("Not authorized"));
  }

  const { id } = jwt.verify(token, JWT_SECRET);
  const user = await User.findById(id);
  if (!user) {
    next(new Unauthorized("Not authorized"));
  }
  req.user = user;
  next();
};

module.exports = {
  checkToken,
};
