var mongoose = require('mongoose')

var ToySchema = mongoose.Schema(
   {
      name: String,
      brand: String,
      category: String,
      quantity: Number,
      price: Number,
      image: String,
      detail:String
   }
);

var ToyModel = mongoose.model("Toy Story", ToySchema, "Product");
module.exports = ToyModel;