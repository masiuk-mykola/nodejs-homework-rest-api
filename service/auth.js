const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { Conflict, Unauthorized, NotFound } = require("http-errors");
const { User } = require("../models/userModel");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const JWT_SECRET = process.env.JWT_SECRET;

const register = async (email, password, verificationToken, subscription) => {
  const user = await User.findOne({ email });
  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      avatarURL,
      verificationToken,
      subscription,
    });
    return newUser;
  }
  throw new Conflict("Email in use");
};

const login = async (email, password) => {
  const user = await User.findOne({ email, verify: true });
  if (!user) {
    throw new Unauthorized("Email not verified");
  }
  const isPasswordCompare = await bcrypt.compare(password, user.password);

  if (!user || !isPasswordCompare) {
    throw new Unauthorized("Email or password is wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, JWT_SECRET);
  await User.findByIdAndUpdate(user._id, { token });

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
  if (!user) {
    throw new Unauthorized("Not authorized");
  }
  await User.findByIdAndUpdate(id, { token: null });
};

const verifyUser = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw new NotFound("User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  });
};

const verifyEmail = async (email) => {
  const user = await User.findOne({ email, verify: false });
  if (user) {
    const msg = {
      to: email,
      from: "masiuk.mykola@gmail.com",
      subject: "Verification email again",
      text: `Please, verify your email following this link http://localhost:3000/api/users/verify/${user.verificationToken}`,
      html: `<h2>Please, <a href='http://localhost:3000/api/users/verify/${user.verificationToken}'>verify</a> your email</h2>`,
    };

    await sgMail.send(msg);
  }
  return user;
};

module.exports = {
  register,
  login,
  logout,
  verifyUser,
  verifyEmail,
};
