const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const productSchema = new Schema({
  title: String,
  image: String,
  oldprice: Number,
  newprice: Number,
  description: String,
  categery: String,
  subcategery: String,
  reviewid: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
