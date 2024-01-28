const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
      count: {
        type: Number,
        default: 0,
      },
    },
  ],
});

module.exports = mongoose.model("cart", cartSchema);
