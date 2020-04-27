// const sequelize = require("sequelize");
// const DT = sequelize.DataTypes;
// const bcrypt = require("bcrypt");
// const sequelizeconnection = new sequelize("handshake", "admin", "admin#123", {
//   host: "handshake.chf9uwuchcb3.us-east-1.rds.amazonaws.com",
//   dialect: "mysql"
// });
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const mongoosePaginate = require("mongoose-paginate");

const fundraisers = new mongoose.Schema(
  {
    companyName: String,
    companyId: String,
    title: String,
    description: String,
    category: String
  },
  { timestamps: true }
);

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

const company = new mongoose.Schema({
  companyName: String,
  emailId: { type: String, unique: true },
  password: String,
  location: String,
  about: String,
  phone: String,
  profilePic: String
});
fundraisers.plugin(mongoosePaginate);
company.plugin(uniqueValidator);
// event.plugin(mongoosePaginate);

const Company = mongoose.model("Company", company);
const Fundraiser = mongoose.model("Fundraiser", fundraisers);
// const Event = mongoose.model("event", event);

module.exports = {
  Company,
  Fundraiser
};
