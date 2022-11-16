const { updateUserStatus, updateUserAvatar } = require("../service/user");
const path = require("path");
const fs = require("fs").promises;
const Jimp = require("jimp");

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

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const avatarCtrl = async (req, res) => {
  const { _id: id } = req.user;
  const { path: tmpUpload, originalname } = req.file;
  try {
    const resultUpload = path.join(avatarsDir, `${id}.${originalname}`);
    await Jimp.read(tmpUpload)
      .then((img) => {
        return img.resize(255, 255).writeAsync(tmpUpload);
      })
      .catch((err) => {
        console.error(err);
      });

    await fs.rename(tmpUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", `${id}.${originalname}`);
    const data = await updateUserAvatar(id, avatarURL);
    res.json(data);
  } catch (error) {
    await fs.unlink(tmpUpload);
    throw error;
  }
};

module.exports = {
  currentUserCtrl,
  userStatusCtrl,
  avatarCtrl,
};
