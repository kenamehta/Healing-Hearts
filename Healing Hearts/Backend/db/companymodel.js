const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const mongoosePaginate = require("mongoose-paginate");

const company = new mongoose.Schema({
  companyName: String,
  emailId: { type: String, unique: true },
  password: String,
  location: String,
  about: String,
  phone: String,
  profilePic: String
});

company.plugin(uniqueValidator);
// event.plugin(mongoosePaginate);

const Company = mongoose.model("Company", company);

const fundraisers = new mongoose.Schema(
  {
    companyName: String,
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company"
    },
    title: String,
    description: String,
    category: String,
    amount: String,
    amountDonated:Number
  },
  { timestamps: true }
);
fundraisers.plugin(mongoosePaginate);
// const event= new mongoose.Schema({
//     company_basic_detail_id:String,
//     company_name:String,
//     event_detail_id:String,
//     event_name:String,
//     date:Date,
//     event_time:String,
//     location:String,
//     eligibility:String,
//     event_description:String
// },
//    { timestamps: true })

const Fundraiser = mongoose.model("Fundraiser", fundraisers);
// const Event = mongoose.model("event", event);

module.exports = {
  Company,
  Fundraiser
};
