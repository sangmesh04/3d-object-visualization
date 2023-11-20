const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

module.exports.signup = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      username,
      email,
      accountType,
      mobilenumber,
      password,
    } = req.body;

    const usernameduplicate = await User.find({ username: username });

    if (usernameduplicate.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }

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
      username,
      email,
      accountType,
      mobilenumber,
      password,
    });
    return res.status(201).json({ status: true, user: user._id });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err });
  }
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;

  User.find({ username: username })
    .then((response) => {
      if (response.length != 0) {
        bcrypt.compare(password, response[0].password).then((rest) => {
          if (rest) {
            console.log(rest);
            var token = jwt.sign({ id: response[0].id }, config.secret, {
              expiresIn: 86400, // 24 hours
            });
            res.status(202).json({
              message: "User logged in successfully!",
              user: response[0],
              success: true,
              accessToken: token,
              role: response[0].role,
            });
          } else {
            res
              .status(401)
              .json({ message: "Incorrect password!", success: false });
          }
        });
      } else {
        res.status(404).json({ message: "User not found!", success: false });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err, success: false });
    });
};
