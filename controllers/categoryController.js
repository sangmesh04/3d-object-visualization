const Category = require("../models/category");

module.exports.addCategory = async (req, res) => {
  try {
    const category = await Category.create({ ...req.body });
    if (category) {
      res
        .status(200)
        .json({ status: true, message: "Category added successfully!" });
    } else {
      res
        .status(400)
        .json({ status: true, message: "Unable to add new category!" });
    }
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

module.exports.getCategory = async (req, res) => {
  try {
    const category = await Category.find({ isDeleted: false });
    res.status(200).json({ status: true, data: category });
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

module.exports.getCategoryList = async (req, res) => {
  try {
    const categoryList = await Category.find(
      { isDeleted: false },
      { name: true, _id: true }
    );
    res.status(200).json({ status: true, data: categoryList });
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

module.exports.deleteCategory = async (req, res) => {
  try {
    const categoryList = await Category.updateOne(
      { _id: req.params.id },
      { $set: { isDeleted: true } }
    );
    res
      .status(200)
      .json({ status: true, message: "Category deleted successfully!" });
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};
