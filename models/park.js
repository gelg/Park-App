var mongoose = require("mongoose");

var parkSchema = new mongoose.Schema(
{
  userId: String,
  author: String,
  name: String,
  streetAddress: String,
  city: String,
  state: String,
  zipcode: String,
  images: [String],
  description: String,
  reviews:
  [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review"
    }
  ],
  rentable: Boolean,
  rentRange: String
  //add an object that has the time and and weekly schedule event to put on
  // the page of a park
});
module.exports = mongoose.model("Park", parkSchema);
