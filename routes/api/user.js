const express = require("express");

const {
  registerCtrl,
  loginCtrl,
} = require("../../controllers/userControllers");
const {
  registertSchema,
  loginSchema,
} = require("./middleware/schemes/userValidSchema");
const { validation } = require("./middleware/validationBody");

const router = express.Router();

router.post("/register", validation(registertSchema), registerCtrl);
router.get("/login", validation(loginSchema), loginCtrl);

module.exports = router;
