const Cart = require("../models/cart");

module.exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (cart) {
      res.status(200).json({ status: true, data: cart.cart });
    } else {
      res.status(200).json({ status: true, data: [] });
    }
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

module.exports.GetCartDetails = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate({
      path: "cart.productId",
    });
    if (cart) {
      res.status(200).json({ status: true, data: cart });
    } else {
      res.status(200).json({ status: true, data: {} });
    }
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

module.exports.AddToCart = async (req, res) => {
  try {
    const inicart = await Cart.findOne({ userId: req.user._id });
    if (inicart) {
      var icart = inicart.cart;
      var condi = false;
      icart.filter((tmp) => {
        if (tmp.productId == req.body.cart.productId) {
          tmp.count = tmp.count + 1;
          condi = true;
        }
      });
      if (!condi) {
        icart.push({ productId: req.body.cart.productId, count: 1 });
      }
      const addcart = await Cart.updateOne(
        { userId: req.user._id },
        { $set: { cart: icart } }
      );
      res.status(200).json({
        status: true,
        message: "Product added to cart!",
        data: icart,
      });
    } else {
      const addcart = await Cart.create({
        userId: req.user._id,
        cart: [
          {
            productId: req.body.cart.productId,
            count: req.body.cart.count,
          },
        ],
      });
      res.status(200).json({
        status: true,
        message: "Product added to cart!",
        data: addcart.cart,
      });
    }
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

module.exports.RemoveFromCart = async (req, res) => {
  try {
    const inicart = await Cart.findOne({ userId: req.user._id });
    if (inicart) {
      var icart = inicart.cart;
      var newcart = [];
      icart.map((tmp) => {
        if (tmp.productId == req.body.cart.productId) {
          if (tmp.count > 1) {
            tmp.count = tmp.count - 1;
            newcart.push(tmp);
          }
        } else {
          newcart.push(tmp);
        }
      });

      const addcart = await Cart.updateOne(
        { userId: req.user._id },
        { $set: { cart: newcart } }
      );
      res.status(200).json({
        status: true,
        message: "Product removed from cart!",
        data: newcart,
      });
    } else {
      res.status(404).json({
        status: false,
        message: "User not found!",
        data: [],
      });
      return;
    }
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};
