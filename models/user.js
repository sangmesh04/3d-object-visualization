const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Firstname is required"],
  },

  lastname: {
    type: String,
    required: [true, "Lastname is required"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },

  mobilenumber: {
    type: String,
    required: [true, "Mobile is required"],
    unique: true,
  },

  isAddressFilled: {
    type: Boolean,
    default: false,
  },

  address: {
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
  },

  role: {
    type: String,
    default: "customer",
  },

  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
