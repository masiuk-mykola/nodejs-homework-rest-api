const express = require("express");
const {
  currentUserCtrl,
  userStatusCtrl,
} = require("../../controllers/userController");

const { checkToken } = require("./middleware/checkToken");

const router = express.Router();

router.get("/current", checkToken, currentUserCtrl);
router.patch("/", checkToken, userStatusCtrl);

module.exports = router;
