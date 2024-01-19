const express = require("express");
const userController = require("../controllers/userController");
const authUser = require("../middleware/authUser");
const router = express.Router();

router.post("/user/signup", userController.signup);

router.post("/user/login", userController.login);

router.get("/user/profile", authUser, userController.getProfile);

router.post("/user/profile/update", authUser, userController.profileUpdate);

module.exports = router;
