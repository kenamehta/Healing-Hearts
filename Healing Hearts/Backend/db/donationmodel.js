const mongoose = require("mongoose");
const { Company, Fundraiser } = require("../db/comapnymodel");
const { Donor } = require("../db/donormodel");
const mongoosePaginate = require("mongoose-paginate");

//When donar donates to a particular fundraiser, Donation model will be populated
const donation = new mongoose.Schema(
  {
    fundraiserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fundraiser"
    },
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donor"
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company"
    },
    amount: String
  },
  { timestamps: true }
);

donation.plugin(mongoosePaginate);
const Donation = mongoose.model("Donation", donation);

module.exports = { Donation };
