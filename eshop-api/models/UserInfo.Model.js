const mongoose = require("mongoose");

const UserInfoSchema = new mongoose.Schema({
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  useremail: {
    type: String,
  },
  username: {
    type: String,
  },
  avatar: {
    type: String,
  },
});

const UserInfoModel = mongoose.model("userinfo", UserInfoSchema);

module.exports = UserInfoModel;
