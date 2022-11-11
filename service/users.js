const { Conflict } = require("http-errors");
const { User } = require("../models/userModel");

const register = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict("Email in use");
    }
    const newUser = await User.create({ email, password });
    return newUser;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  register,
};
