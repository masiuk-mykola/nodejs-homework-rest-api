const { register, login, logout } = require("../service/auth");

const registerCtrl = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await register(email, password);

    res.status(201).json({ user: data });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const loginCtrl = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await login(email, password);

    res.status(200).json({ data });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const logoutCtrl = async (req, res) => {
  try {
    const userId = req.user._id;
    await logout(userId);
    res.status(204).json();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  registerCtrl,
  loginCtrl,
  logoutCtrl,
};
