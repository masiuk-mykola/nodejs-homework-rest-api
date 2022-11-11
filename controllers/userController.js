// const { checkUser } = require("../service/currentUser");

const currentUserCtrl = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    user: {
      email: email,
      subscription: subscription,
    },
  });
};

module.exports = {
  currentUserCtrl,
};
