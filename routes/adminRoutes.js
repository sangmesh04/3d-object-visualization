const express = require("express");
const categoryController = require("../controllers/categoryController");
const userController = require("../controllers/userController");
const productController = require("../controllers/productController");
const authAdmin = require("../middleware/authAdmin");
const router = express.Router();

// category routes
router.post("/category/add", authAdmin, categoryController.addCategory);

router.get("/category", categoryController.getCategory); //public api

router.get("/categoryList", authAdmin, categoryController.getCategoryList);

router.get("/admin/signout", authAdmin, userController.SignOut);

router.delete(
  "/category/delete/:id",
  authAdmin,
  categoryController.deleteCategory
);

// product routes
router.post("/product/add", authAdmin, productController.addProduct);

router.get("/products", productController.getProducts); //public api

router.delete(
  "/product/delete/:id",
  authAdmin,
  productController.deleteCProduct
);

module.exports = router;
