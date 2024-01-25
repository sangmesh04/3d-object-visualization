const User = require("../models/user");
const Address = require("../models/address");
const { createToken } = require("../utils/createToken");
const bcrypt = require("bcryptjs");
const maxAge = 3 * 24 * 60 * 60;

module.exports.signup = async (req, res) => {
  try {
    const { firstname, lastname, email, mobilenumber, password } = req.body;

    const emailduplicate = await User.find({ email: email });

    if (emailduplicate.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const monbileduplicate = await User.find({ mobilenumber: mobilenumber });

    if (monbileduplicate.length > 0) {
      return res.status(400).json({ message: "Mobile number already exists" });
    }

    const user = await User.create({
      firstname,
      lastname,
      email,
      mobilenumber,
      password,
    });
    return res.status(201).json({ status: true, user: user._id });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err });
  }
};

module.exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "address",
    });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found!", status: false });
    }
    var userData = JSON.parse(JSON.stringify(user));
    delete userData["password"];
    res.status(200).json({ user: userData, status: true });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

module.exports.profileUpdate = async (req, res) => {
  try {
    const updatedUser = req.body.user;
    const address = req.body.address;
    const newaddress = await Address.updateOne(
      { _id: updatedUser.address },
      { $set: { ...address }, options: { upsert: true } }
    );
    const user = await User.updateOne(
      { _id: req.user._id },
      { $set: { ...updatedUser, address: newaddress._id } }
    );
    res
      .status(200)
      .json({ status: true, message: "User data updated successfully!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password).then((rest) => {
        if (rest) {
          const token = createToken(user._id);
          res.cookie("token", token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // 3 days
          });
          res
            .status(200)
            .json({ user, usertype: user.role, token, success: true });
        } else {
          res
            .status(400)
            .json({ success: false, error: "Incorrect password!" });
        }
      });
    } else {
      res.status(404).json({ success: false, error: "User not found!" });
    }
  } catch (err) {
    // const error = handleErrors(err);
    console.log(err);
    res.status(400).json({ success: false, error: err });
  }
};

module.exports.SignOut = async (req, res) => {
  try {
    req.user._id = "";
    res.cookie("token", "", { maxAge: 1 });
    res.cookie("usertype", "", { maxAge: 1 });
    res.send({ success: true, message: "User logged out!" });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};
