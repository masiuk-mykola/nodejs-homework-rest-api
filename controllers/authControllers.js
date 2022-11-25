const { v4: uuidv4 } = require("uuid");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const {
  register,
  login,
  logout,
  verifyUser,
  verifyEmail,
} = require("../service/auth");

const registerCtrl = async (req, res) => {
  const verificationToken = uuidv4();

  try {
    const { email, password, subscription } = req.body;
    const data = await register(
      email,
      password,
      verificationToken,
      subscription
    );

    const msg = {
      to: email,
      from: "masiuk.mykola@gmail.com",
      subject: "Verification email",
      text: `Please, verify your email following this link http://localhost:3000/api/users/verify/${verificationToken}`,
      html: `<h2>Please, <a href='http://localhost:3000/api/users/verify/${verificationToken}'>verify</a> your email</h2>`,
    };

    await sgMail.send(msg);

    res.status(201).json({ user: data });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const verifyUserCtrl = async (req, res) => {
  try {
    const { verificationToken } = req.params;
    await verifyUser(verificationToken);
    res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const verifyUserEmailCtrl = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: "missing required field email" });
  }
  const user = await verifyEmail(email);
  if (user) {
    // const msg = {
    //   to: email,
    //   from: "masiuk.mykola@gmail.com",
    //   subject: "Verification email again",
    //   text: `Please, verify your email following this link http://localhost:3000/api/users/verify/${verificationToken}`,
    //   html: `<h2>Please, <a href='http://localhost:3000/api/users/verify/${verificationToken}'>verify</a> your email</h2>`,
    // };

    // await sgMail.send(msg);

    res.status(200).json({ message: "Verification email sent" });
  } else {
    res.status(400).json({ message: "Verification has already been passed" });
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
  verifyUserCtrl,
  verifyUserEmailCtrl,
};
