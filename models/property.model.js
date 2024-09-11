const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  facilities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Facility",
      required: true,
    },
  ],
  images: [
    {
      type: String,
      required: true,
    },
  ],
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  userRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Property = mongoose.model("Property", PropertySchema);
module.exports = Property;
