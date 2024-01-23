const Product = require("../models/product");
const multer = require("multer");
const path = require("path");
const fs = require("fs-extra");

let upload = multer({
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      // ** code for making directory using job ID make sure to change schema of file.js
      let path = `./uploads/products`;
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
      }
      cb(null, path);
    },
    filename: async (req, file, cb) => {
      //  ** with student auth Code
      const uniqueName =
        file.originalname.split(".")[0].split(" ")[0] +
        "-" +
        Math.floor(Math.random() * 1000000 + 1000000);
      let filename = uniqueName;
      req.filename = filename + path.extname(file.originalname);
      cb(null, filename + path.extname(file.originalname));
    },
  }),
}).single("image");

module.exports.addProduct = async (req, res) => {
  upload(req, res, async () => {
    try {
      const category = await Product.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category,
        image: `./uploads/products/${req.filename}`,
      });
      // console.log(resume);
      if (category) {
        res.status(201).json({
          success: true,
          message: "Product added successfully!",
        });
      } else {
        res
          .status(400)
          .json({ success: false, message: "Unable to add product!" });
      }
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
      // ** code for resume-upload using student authentication middleware
      if (fs.existsSync(`./uploads/products/${req.filename}`)) {
        fs.unlink(`./uploads/products/${req.filename}`);
      }
    }
  });
};

module.exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate({ path: "category" });
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
