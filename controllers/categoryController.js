const Category = require("../models/category");

module.exports.addCategory = async (req, res) => {
  try {
    const catData = req.body;
    const category = await Category.create({ ...catData });
    if (category) {
      res
        .status(200)
        .json({ status: true, message: "Category added successfully!" });
    } else {
      res
        .status(400)
        .json({ status: false, message: "Unable to add category!" });
    }
  } catch (err) {
    res.status(400).json({ status: false, error: err });
  }
};
