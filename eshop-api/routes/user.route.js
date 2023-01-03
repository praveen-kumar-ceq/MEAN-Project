const express = require("express");
const {
  signUpController,
  getUsers,
  deleteUser,
  LoginController,
} = require("../controllers/UserController");

const router = express.Router();

router.route("/").get(getUsers);
router.route("/:id").delete(deleteUser);

router.route("/signup").post(signUpController);

router.route("/login").post(LoginController);

module.exports = router;
