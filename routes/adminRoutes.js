const express = require("express");
const categoryController = require("../controllers/categoryController");
const productController = require("../controllers/productController");
const authAdmin = require("../middleware/authAdmin");
const router = express.Router();

// category routes
router.post("/category/add", authAdmin, categoryController.addCategory);

router.get("/category", authAdmin, categoryController.getCategory);

router.get("/categoryList", authAdmin, categoryController.getCategoryList);

// product routes
router.post("/product/add", authAdmin, productController.addProduct);

router.get("/products", authAdmin, productController.getProducts);

module.exports = router;
