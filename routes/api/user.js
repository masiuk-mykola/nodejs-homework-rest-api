const express = require("express");
const { currentUserCtrl } = require("../../controllers/userController");

const { checkToken } = require("./middleware/checkToken");

const router = express.Router();

router.get("/current", checkToken, currentUserCtrl);

module.exports = router;
