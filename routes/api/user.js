const express = require("express");
const {
  logoutCtrl,
  loginCtrl,
  registerCtrl,
} = require("../../controllers/authControllers");
const {
  currentUserCtrl,
  userStatusCtrl,
} = require("../../controllers/userController");

const { checkToken } = require("./middleware/checkToken");
const {
  registertSchema,
  loginSchema,
} = require("./middleware/schemes/userValidSchema");
const { validation } = require("./middleware/validationBody");

const router = express.Router();

router.get("/current", checkToken, currentUserCtrl);
router.patch("/", checkToken, userStatusCtrl);
router.post("/register", validation(registertSchema), registerCtrl);
router.get("/login", validation(loginSchema), loginCtrl);
router.post("/logout", checkToken, logoutCtrl);

module.exports = router;
