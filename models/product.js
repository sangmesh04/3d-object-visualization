const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name required!"],
  },
  description: {
    type: String,
    required: [true, "Product description required!"],
  },
  image: {
    type: String,
    required: [true, "Product image required!"],
  },
  price: {
    type: Number,
    required: [true, "Product price required!"],
  },
  quantity: {
    type: Number,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("product", productSchema);
