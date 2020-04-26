const sequelize = require("sequelize");
const DT = sequelize.DataTypes;
const bcrypt = require("bcrypt");
const sequelizeconnection = new sequelize("handshake", "admin", "admin#123", {
  host: "handshake.chf9uwuchcb3.us-east-1.rds.amazonaws.com",
  dialect: "mysql"
});
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const mongoosePaginate = require("mongoose-paginate")

const job=new mongoose.Schema({
    company_basic_detail_id:String,
    company_name:String,
    job_id:String,
    job_title:String,
    deadline:Date,
    location:String,
    salary:String,
    job_description:String,
    job_category:String
},
{ timestamps: true }
)

const event= new mongoose.Schema({
    company_basic_detail_id:String,
    company_name:String,
    event_detail_id:String,
    event_name:String,
    date:Date,
    event_time:String,
    location:String,
    eligibility:String,
    event_description:String
},
   { timestamps: true })





const company = new mongoose.Schema({
    company_basic_detail_id:String,
  company_name: String,
  emailId: { type: String, unique: true },
  password: String,
  location: String,
  description: String,
  phone: String,
  profilepicaddress: String,
  profilepicname: String,
//   job:[job],
//   event:[event]
});
job.plugin(mongoosePaginate);
company.plugin(uniqueValidator);
event.plugin(mongoosePaginate);

const Company = mongoose.model("company", company);
const Job = mongoose.model("job", job);
const Event = mongoose.model("event", event);

module.exports = {
  Company,Job,Event
};
