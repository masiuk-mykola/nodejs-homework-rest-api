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

const updateUserAvatar = async (id, avatarURL) => {
  const user = await User.findByIdAndUpdate(
    id,
    { avatarURL },
    {
      new: true,
    }
  );
  return {
    user: {
      avatarURL: user.avatarURL,
    },
  };
};

module.exports = { updateUserStatus, updateUserAvatar };
