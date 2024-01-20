const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is mandatory!"],
    },
    description: {
      type: String,
      required: [true, "Category description is mandatory!"],
    },
    image: {
      type: String,
      required: [true, "Select category image!"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("category", categorySchema);
