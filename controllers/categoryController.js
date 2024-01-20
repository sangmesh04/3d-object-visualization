const Category = require("../models/category");
const multer = require("multer");
const path = require("path");
const fs = require("fs-extra");

let upload = multer({
  storage: multer.diskStorage({
    destination: async (req, file, cb) => {
      // ** code for making directory using job ID make sure to change schema of file.js
      let path = `./uploads/category`;
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

module.exports.addCategory = async (req, res) => {
  upload(req, res, async () => {
    try {
      const category = await Category.create({
        name: req.body.name,
        description: req.body.description,
        image: `./uploads/category/${req.filename}`,
      });
      // console.log(resume);
      if (category) {
        res.status(201).json({
          success: true,
          message: "Category added successfully!",
        });
      } else {
        res
          .status(400)
          .json({ success: false, message: "Unable to add category!" });
      }
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
      // ** code for resume-upload using student authentication middleware
      if (fs.existsSync(`./uploads/category/${req.filename}`)) {
        fs.unlink(`./uploads/category/${req.filename}`);
      }
    }
  });
};

module.exports.getCategory = async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json({ status: true, data: category });
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};
