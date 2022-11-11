const { register } = require("../service/users");

const registerCtrl = async (req, res) => {
  const { email, password } = req.body;
  const data = await register(email, password);
  console.log("data", data);
  if (!data) {
    res.status(409).json({ message: "Email in use" });
  } else {
    res.status(201).json({ user: data });
  }
};

module.exports = {
  registerCtrl,
};
