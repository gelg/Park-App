var mongoose = require("mongoose");

var parkRequestSchema = new mongoose.Schema(
{
  name: String,
  streetAdress: String,
  city: String,
  state: String,
  zipcode: String,
  images: [String],
  description: String,
  ratings: [Number],
  reviews: [String],
  rentable: Boolean,
  rentRange: String
});
module.exports = mongoose.model("ParkRequest", parkRequestSchema);
