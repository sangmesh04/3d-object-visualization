const Product = require("../models/product");

module.exports.addProduct = async (req, res) => {
  try {
    const product = await Product.create({ ...req.body });
    if (product) {
      res
        .status(200)
        .json({ status: true, message: "Product added successfully!" });
    } else {
      res
        .status(400)
        .json({ status: true, message: "Unable to add new product!" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ isDeleted: false }).populate({
      path: "category",
    });
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports.getAproduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.productId });
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

module.exports.deleteCProduct = async (req, res) => {
  try {
    const product = await Product.updateOne(
      { _id: req.params.id },
      { $set: { isDeleted: true } }
    );
    res
      .status(200)
      .json({ status: true, message: "Product deleted successfully!" });
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};
