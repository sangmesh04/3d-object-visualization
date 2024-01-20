const express = require("express");
const categoryController = require("../controllers/categoryController");
const authAdmin = require("../middleware/authAdmin");
const router = express.Router();

router.post("/category/add", authAdmin, categoryController.addCategory);

router.get("/category", authAdmin, categoryController.getCategory);

module.exports = router;
