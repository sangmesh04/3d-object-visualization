const express = require("express");
const categoryController = require("../controllers/categoryController");
const userController = require("../controllers/userController");
const productController = require("../controllers/productController");
const orderController = require("../controllers/orderController");
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

router.get("/product/:productId", productController.getAproduct); //public api

router.delete(
  "/product/delete/:id",
  authAdmin,
  productController.deleteCProduct
);

// orders routes
router.get("/orders", authAdmin, orderController.getAllOrders);
module.exports = router;
