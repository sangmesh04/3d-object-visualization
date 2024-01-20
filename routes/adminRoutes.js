const express = require("express");
const categoryController = require("../controllers/categoryController");
const authAdmin = require("../middleware/authAdmin");
const router = express.Router();

router.post("/category/add", authAdmin, categoryController.addCategory);

module.exports = router;
