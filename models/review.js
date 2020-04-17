var mongoose = require("mongoose");

var reviewSchema = new mongoose.Schema(
{
  userId: String,
  author: String,
  rating: Number,
  reason: String,
  //add an object that has the time and and weekly schedule event to put on
});
module.exports = mongoose.model("Review", reviewSchema);
