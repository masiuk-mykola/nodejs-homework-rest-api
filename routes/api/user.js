const express = require("express");

const { registerCtrl } = require("../../controllers/userControllers");
const { registertSchema } = require("./middleware/schemes/userValidSchema");
const { validation } = require("./middleware/validationBody");

const router = express.Router();

router.post("/register", validation(registertSchema), registerCtrl);

module.exports = router;
