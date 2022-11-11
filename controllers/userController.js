// const { checkUser } = require("../service/currentUser");

const currentUserCtrl = async (req, res) => {
  console.log(req.user);
};

module.exports = {
  currentUserCtrl,
};
