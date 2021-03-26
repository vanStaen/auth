const mongoose = require("mongoose");

const PassportSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  password: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Passport", PassportSchema);
