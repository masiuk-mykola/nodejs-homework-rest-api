const { User } = require("../models/userModel");

const updateUserStatus = async (id, status) => {
  const user = await User.findByIdAndUpdate(id, status, {
    new: true,
  });
  return {
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  };
};

module.exports = { updateUserStatus };
