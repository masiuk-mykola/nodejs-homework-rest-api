const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Conflict, Unauthorized } = require("http-errors");
const { User } = require("../models/userModel");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const register = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict("Email in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });
    return newUser;
  } catch (error) {
    console.log(error.message);
  }
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  const isPasswordCompare = await bcrypt.compare(password, user.password);
  if (!user || !isPasswordCompare) {
    throw new Unauthorized("Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, JWT_SECRET);
  return {
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  };
};

module.exports = {
  register,
  login,
};
