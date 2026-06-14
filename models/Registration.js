const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },

    status: {
      type: String,
      default: "Registered",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Registration",
  registrationSchema
);