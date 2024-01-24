const Wishlist = require("../models/wishlist");

module.exports.AddToWishlist = async (req, res) => {
  try {
    const inirecord = await Wishlist.findOne({ userId: req.user._id });
    if (inirecord) {
      const productList = inirecord.products;
      productList.push(req.body.productId);
      const updateproductlist = await Wishlist.updateOne(
        { userId: req.user._id },
        { $set: { products: productList } }
      );
      res.status(200).json({
        status: true,
        data: productList,
        message: "Product added to wishlist successfully!",
      });
    } else {
      const wishlist = await Wishlist.create({
        userId: req.user._id,
        products: [req.body.productId],
      });
      res.status(200).json({
        status: true,
        data: [req.body.productId],
        message: "Product added to wishlist successfully!",
      });
    }
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

module.exports.RemoveFromWishlist = async (req, res) => {
  try {
    const inirecord = await Wishlist.findOne({ userId: req.user._id });
    if (inirecord) {
      var productList = inirecord.products;
      productList = productList.filter((item) => item != req.body.productId);
      const updateproductlist = await Wishlist.updateOne(
        { userId: req.user._id },
        { $set: { products: productList } }
      );
      res.status(200).json({
        status: true,
        data: productList,
        message: "Product removed from wishlist successfully!",
      });
    } else {
      res.status(404).json({
        status: false,
        data: [],
        message: "Product not found in wishlist!",
      });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: false, message: err });
  }
};

module.exports.GetWishlistProducts = async (req, res) => {
  try {
    const products = await Wishlist.findOne({ userId: req.user._id });
    if (products) {
      res.status(200).json({
        status: true,
        data: products.products,
      });
    } else {
      res.status(200).json({
        status: true,
        data: [],
      });
    }
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

module.exports.GetWishlistProductsDetails = async (req, res) => {
  try {
    const products = await Wishlist.findOne({ userId: req.user._id }).populate({
      path: "products",
    });
    if (products) {
      res.status(200).json({
        status: true,
        data: products.products,
      });
    } else {
      res.status(200).json({
        status: true,
        data: [],
      });
    }
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};
