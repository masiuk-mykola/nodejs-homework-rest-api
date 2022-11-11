const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Conflict, Unauthorized } = require("http-errors");
const { User } = require("../models/userModel");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const register = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });
    return newUser;
  }
  throw new Conflict("Email in use");
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
  await User.findOneAndUpdate({ email }, { token });

  return {
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  };
};

const logout = async (id) => {
  const user = await User.findById(id);
  console.log("user", user);
  if (!user) {
    throw new Unauthorized("Not authorized");
  }
  await User.findByIdAndUpdate(id, { token: null });
};

module.exports = {
  register,
  login,
  logout,
};
