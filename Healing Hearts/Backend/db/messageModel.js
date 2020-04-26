const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Student } = require("./studentmodel");
const { Company } = require("./comapnymodel");

const conversation = new mongoose.Schema(
  {
    Body: {
      type: String,
    },
    senderId: String,
  },
  { timestamps: true }
);
const messages = new mongoose.Schema(
  {
    MessageArray: [conversation],
    Sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "SenderModel",
    },
    Receiver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "ReceiverModel",
    },
    SenderModel: {
      type: String,
      required: true,
      enum: ["student", "company"],
    },
    ReceiverModel: {
      type: String,
      required: true,
      enum: ["student", "company"],
    },
  },
  { timestamps: true }
);
const Messages = mongoose.model("messages", messages);

module.exports = {
  Messages,
};
