const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
  // Описываем модель settings. То есть из чего состоит объект settings.
  id: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  type: {
    type: String,
    unique: false,
    required: false,
  },
  model: {
    type: mongoose.Schema.Types.Mixed,
    unique: false,
    required: false,
  },
});

module.exports = mongoose.model("settings", settingSchema);
