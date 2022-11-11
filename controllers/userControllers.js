const { register, login } = require("../service/users");

const registerCtrl = async (req, res) => {
  const { email, password } = req.body;
  const data = await register(email, password);
  if (!data) {
    res.status(409).json({ message: "Email in use" });
  } else {
    res.status(201).json({ user: data });
  }
};

const loginCtrl = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await login(email, password);
    res.status(200).json({ data });
  } catch (error) {
    res.status(401).json({ message: "Email or password is wrong" });
  }
};

module.exports = {
  registerCtrl,
  loginCtrl,
};
