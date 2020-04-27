const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Donor } = require("./donormodel");
const { Company } = require("./companymodel");

const conversation = new mongoose.Schema(
  {
    Body: {
      type: String
    },
    senderId: String
  },
  { timestamps: true }
);
const messages = new mongoose.Schema(
  {
    MessageArray: [conversation],
    Sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "SenderModel"
    },
    Receiver: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "ReceiverModel"
    },
    SenderModel: {
      type: String,
      required: true,
      enum: ["Company", "Donor"]
    },
    ReceiverModel: {
      type: String,
      required: true,
      enum: ["Company", "Donor"]
    }
  },
  { timestamps: true }
);
const Messages = mongoose.model("Messages", messages);

module.exports = {
  Messages
};
