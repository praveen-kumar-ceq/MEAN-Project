const userModel = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (e) {
    res.status(404).json({
      status: "fail",
      message: e,
    });
  }
};

exports.signUpController = async (req, res) => {
  try {
    const userdata = req.body;
    const password = bcrypt.hashSync(userdata.password, 12);
    const newData = {
      email: userdata.email,
      password: password,
    };
    const user = await userModel.create(newData);
    res.status(201).json({
      status: "success",
      message: "user is successfully registered",
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: "User data deleted successfully",
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e,
    });
  }
};
exports.LoginController = async (req, res) => {
  try {
    const user = await userModel.find({ email: req.body.email });
    if (user.length === 0) {
      res.status(401).json({
        status: "fail",
        message: "User not found",
      });
    } else {
      const passwordSame = bcrypt.compareSync(
        req.body.password,
        user[0].password
      );
      if (passwordSame) {
        const token = jwt.sign(
          {
            email: user[0].email,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({
          status: "successful",
          message: "login successful",
          token: token,
        });
      } else {
        res.status(401).json({
          status: "fail",
          message: "Authentication failed! Passwords not match",
        });
      }
    }
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e,
    });
  }
};
