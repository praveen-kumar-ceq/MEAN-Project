const bookModel = require("./../models/BookModel");

exports.createBook = async (req, res) => {
  try {
    const newBook = await bookModel.create(req.body);
    res.status(201).json({
      status: "success",
      data: newBook,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.filterBookDetails = async (req, res) => {
  try {
    const filteredBook = await bookModel.find(req.body);
    const lengthOfBook = filteredBook.length;
    res.status(200).json({
      status: lengthOfBook > 0 ? "not available" : "available",
      availableEntries: lengthOfBook,
      message: lengthOfBook > 0 ? "Name is not available" : "name is available",
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e,
    });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const bookData = await bookModel.find();
    res.status(200).json({
      status: "success",
      data: bookData,
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e,
    });
  }
};

exports.getBook = async (req, res) => {
  try {
    const bookData = await bookModel.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: bookData,
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e,
    });
  }
};

exports.changeBookData = async (req, res) => {
  try {
    const bookData = await bookModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: bookData,
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e,
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await bookModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: "Book data deleted successfully",
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e,
    });
  }
};
