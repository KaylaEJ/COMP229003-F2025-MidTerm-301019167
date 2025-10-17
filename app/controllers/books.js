const mongoose = require('mongoose');
let BookModel = require('../models/books');

module.exports.getBook = async function (req, res, next) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid id' });
    }

    const book = await BookModel.findOne({ _id: req.params.id });
    if (!book) return res.status(404).json({ success: false, message: 'Book not found.' });

    res.json(book);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.create = async function (req, res, next) {
  try {
    const result = await BookModel.create(req.body);
    console.log('Result: ', result);

    return res.status(200).json({
      success: true,
      message: 'Book created successfully.',
      bookId: result._id
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.getAll = async function (req, res, next) {
  try {
    const list = await BookModel.find();
    res.json(list);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.update = async function (req, res, next) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid id' });
    }

    const result = await BookModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (result) {
      return res.status(200).json({
        success: true,
        message: 'Book updated successfully.',
        updatedBook: result
      });
    } else {
      return res.status(404).json({ success: false, message: 'Book not found.' });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.remove = async function (req, res, next) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid id' });
    }

    const result = await BookModel.deleteOne({ _id: req.params.id });
    console.log('Result: ', result);

    if (result.deletedCount > 0) {
      return res.status(200).json({
        success: true,
        message: 'Book deleted successfully.'
      });
    } else {
      return res.status(404).json({ success: false, message: 'Book not found.' });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
