const mongoose = require("mongoose");

const conversation = new mongoose.Schema({
  usersId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message",
    },
  ],
  lastMessage: {
    type: String,
  },
  lastMessageDate: {
    type: Number,
  },
});

module.exports = mongoose.model("conversation", conversation);
