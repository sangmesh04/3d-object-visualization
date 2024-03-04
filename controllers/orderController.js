const Order = require("../models/order");
const Cart = require("../models/cart");

module.exports.placeOrder = async (req, res) => {
  try {
    const order = await Order.create({
      userId: req.user._id,
      cart: req.body.cart,
      amount: req.body.amount,
      paymentMethod: req.body.paymentMethod,
      paymentStatus: req.body.paymentStatus,
    });
    if (order) {
      await Cart.deleteOne({ userId: req.user._id });
    }
    res
      .status(200)
      .json({ status: true, message: "Order placed successfully!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: false, message: err });
  }
};

module.exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).populate({
      path: "cart.productId",
    });
    res.status(200).json({ status: true, orders, message: "Orders fetched!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: false, message: err });
  }
};

module.exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate({ path: "cart.productId" });
    res.status(200).json({ status: true, message: "Orders fetched!", orders });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: false, message: err });
  }
};

module.exports.updateDeliveryStatus = async (req, res) => {
  try {
    const order = await Order.updateOne(
      { _id: req.body.orderId },
      { deliveryStatus: req.body.deliveryStatus }
    );
    if (order) {
      res
        .status(200)
        .json({ status: true, message: "Delivery status updated!" });
    } else {
      res.status(400).json({ status: false, message: "Something went wrong!" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: false, message: err });
  }
};
