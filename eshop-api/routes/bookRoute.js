const express = require("express");
const {
  getBooks,
  createBook,
  getBook,
  changeBookData,
  deleteBook,
  filterBookDetails,
} = require("../controllers/bookModelController");
const AuthCheck = require("./../middleware/Auth.Check");

const router = express.Router();

router.route("/").get(AuthCheck, getBooks).post(AuthCheck, createBook);

router.route("/find").post(AuthCheck, filterBookDetails);

router
  .route("/:id")
  .get(AuthCheck, getBook)
  .patch(AuthCheck, changeBookData)
  .delete(AuthCheck, deleteBook);

module.exports = router;
