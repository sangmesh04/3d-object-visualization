const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
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
    amount: {
      type: Number,
      default: 0,
    },
    paymentMethod: {
      type: String,
    },
    paymentStatus: {
      type: Boolean,
      default: false,
    },
    deliveryStatus: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);
