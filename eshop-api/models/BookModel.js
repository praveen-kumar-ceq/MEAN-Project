const mongoose = require("mongoose");

const bookScehema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  price: {
    type: Number,
    required: [true, " A model must have price"],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
});

const bookModel = mongoose.model("book", bookScehema);

module.exports = bookModel;
