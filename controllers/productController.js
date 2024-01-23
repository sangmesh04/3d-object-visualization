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
    const products = await Product.find().populate({ path: "category" });
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
