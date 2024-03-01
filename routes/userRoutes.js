const express = require("express");
const userController = require("../controllers/userController");
const wishlistController = require("../controllers/wishlistController");
const cartController = require("../controllers/cartController");
const orderController = require("../controllers/orderController");
const authUser = require("../middleware/authUser");
const router = express.Router();

router.post("/user/signup", userController.signup);

router.get("/user/signout", authUser, userController.SignOut);

router.post("/user/login", userController.login);

router.get("/user/profile", authUser, userController.getProfile);

router.post("/user/profile/update", authUser, userController.profileUpdate);

//wishlist product
router.post("/wishlist/add", authUser, wishlistController.AddToWishlist);

router.post(
  "/wishlist/remove",
  authUser,
  wishlistController.RemoveFromWishlist
);

router.get("/wishlist", authUser, wishlistController.GetWishlistProducts);

router.get(
  "/wishlist/detail",
  authUser,
  wishlistController.GetWishlistProductsDetails
);

//cart
router.post("/cart/add", authUser, cartController.AddToCart);

router.post("/cart/remove", authUser, cartController.RemoveFromCart);

router.get("/cart", authUser, cartController.getCart);

router.get("/cart/detail", authUser, cartController.GetCartDetails);

//order
router.post("/user/order/place", authUser, orderController.placeOrder);

router.get("/user/orders", authUser, orderController.getOrders);

module.exports = router;
