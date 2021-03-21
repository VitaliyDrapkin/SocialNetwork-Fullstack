const mongoose = require("mongoose");

const user = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  birthday: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
  status: {
    type: String,
  },
  relationship: {
    type: String,
  },
  relationshipUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  address: {
    type: String,
  },
  photos: {
    type: [String],
  },
  friends: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user",
  },
  friendshipRequestsSent: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user",
  },
  friendshipRequestsReceived: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user",
  },
  lastLogin: {
    type: Number,
  },
  profileImage: {
    type: String,
  },
});

module.exports = mongoose.model("user", user);
