const { updateUserStatus } = require("../service/user");

const currentUserCtrl = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    user: {
      email: email,
      subscription: subscription,
    },
  });
};

const userStatusCtrl = async (req, res) => {
  const { _id } = req.user;

  const data = await updateUserStatus(_id, req.body);
  if (data) {
    res.status(200).json({ data });
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = {
  currentUserCtrl,
  userStatusCtrl,
};
