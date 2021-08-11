const mongoose = require("mongoose");

const carsSchema = new mongoose.Schema({
  // Описываем модель Cars. То есть из чего состоит объект car.

  url: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: false,
  },
  price: {
    type: Number,
    required: false,
    unique: false,
  },
  benefit: {
    type: Number,
    required: false,
    unique: false,
  },
  credit: {
    type: Number,
    required: false,
    unique: false,
  },
  power: {
    type: Number,
    required: false,
    unique: false,
  },
  speed: {
    type: Number,
    required: false,
    unique: false,
  },
  gasoline: {
    type: Number,
    required: false,
    unique: false,
  },
  type: {
    type: String,
    required: true,
    unique: false,
  },
  type: {
    type: String,
    required: false,
    unique: false,
  },
  sale: {
    type: Boolean,
    required: true,
    unique: false,
  },
  photos: {
    type: Array,
    required: true,
    unique: false,
  },
  colors: {
    type: Array,
    required: true,
    unique: false,
  },
  image: {
    type: String,
    required: true,
    unique: false,
  },
});

module.exports = mongoose.model("models", carsSchema);
