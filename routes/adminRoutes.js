const express = require("express");
const categoryController = require("../controllers/categoryController");
const productController = require("../controllers/productController");
const authAdmin = require("../middleware/authAdmin");
const router = express.Router();

// category routes
router.post("/category/add", authAdmin, categoryController.addCategory);

router.get("/category", authAdmin, categoryController.getCategory);

router.get("/categoryList", authAdmin, categoryController.getCategoryList);

router.delete(
  "/category/delete/:id",
  authAdmin,
  categoryController.deleteCategory
);

// product routes
router.post("/product/add", authAdmin, productController.addProduct);

router.get("/products", authAdmin, productController.getProducts);

router.delete(
  "/product/delete/:id",
  authAdmin,
  productController.deleteCProduct
);

module.exports = router;
