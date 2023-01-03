const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "A email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "A password is required"],
  },
});

const userModel = mongoose.model("users", UserSchema);

module.exports = userModel;
