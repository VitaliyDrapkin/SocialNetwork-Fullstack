const mongoose = require("mongoose");

const message = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: { type: Number, required: true },
});

module.exports = mongoose.model("message", message);
