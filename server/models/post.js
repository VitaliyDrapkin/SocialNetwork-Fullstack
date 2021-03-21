const mongoose = require("mongoose");

const post = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    require: true,
  },
  date: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
  },
  imgUrl: {
    type: String,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
});

module.exports = mongoose.model("post", post);
