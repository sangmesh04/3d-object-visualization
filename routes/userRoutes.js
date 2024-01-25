const express = require("express");
const userController = require("../controllers/userController");
const wishlistController = require("../controllers/wishlistController");
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

module.exports = router;
