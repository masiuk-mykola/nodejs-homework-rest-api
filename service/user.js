const { User } = require("../models/userModel");

const updateUserStatus = async (id, status) => {
  const data = await User.findByIdAndUpdate(id, status, {
    new: true,
  });
  return data;
};

module.exports = { updateUserStatus };
