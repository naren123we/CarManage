const mongoose = require("mongoose");
const CarSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: [String], // Change to an array of strings
    required: false,
  },
  facilities: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  userEmail: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Car = mongoose.model("Car", CarSchema);

module.exports = Car;
