// const express = require("express");

// const {
//   registerCtrl,
//   loginCtrl,
//   logoutCtrl,
// } = require("../../controllers/authControllers");
// const { checkToken } = require("./middleware/checkToken");
// const {
//   registertSchema,
//   loginSchema,
// } = require("./middleware/schemes/userValidSchema");
// const { validation } = require("./middleware/validationBody");

// const router = express.Router();

// router.post("/register", validation(registertSchema), registerCtrl);
// router.get("/login", validation(loginSchema), loginCtrl);
// router.post("/logout", checkToken, logoutCtrl);

// module.exports = router;
