const Customize = require("../models/customizer");

module.exports.AddCustomize = async (req, res) => {
  try {
    const customize = await Customize.create({
      userId: req.user._id,
      productId: req.body.productId,
      customization: req.body.customization,
      image: req.body.image,
    });
    res.status(200).json({
      status: true,
      message: "Customization request placed successfully!",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: false, message: err });
  }
};
