const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authUser = async (req, res, next) => {
  const token = req.cookies?.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        let AuthError = { error: "User is not authenticated!" };
        res.status(401).send({ AuthError });
      } else {
        const user = await User.findById(decodedToken.id);
        if (user) {
          if (user.role === "admin") {
            req.user = user;
            next();
          } else {
            let AuthError = { error: "User role is not valid!" };
            res.status(401).send({ AuthError });
          }
        } else {
          let AuthError = { error: "User not found!" };
          res.status(401).send({ AuthError });
        }
      }
    });
  } else {
    let AuthError = { error: "User is not authenticated!" };
    res.status(401).send({ AuthError });
  }
};

module.exports = authUser;
