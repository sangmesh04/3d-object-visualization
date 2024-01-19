const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  address: {
    type: String,
  },
  landmark: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  pincode: {
    type: String,
  },
});

module.exports = mongoose.model("Address", addressSchema);
