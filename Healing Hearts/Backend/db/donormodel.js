
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const mongoosePaginate = require("mongoose-paginate");
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");


const donor = new mongoose.Schema({
  name: String,
  dob: Date,
  title: String,
  city: String,
  state: String,
  country: String,
  emailId: { type: String, unique: true },
  phone: String,
  password: String,
  about: String,
  profilePic: String,
});
donor.plugin(uniqueValidator);
donor.plugin(mongoosePaginate);
donor.plugin(aggregatePaginate);

const Donor = mongoose.model("Donor", donor);

// student_profile.belongsTo(student_basic_details,{foreignKey:'student_basic_detail_id'})
// student_education.belongsTo(student_basic_details,{foreignKey:'student_basic_detail_id'})
// student_experience.belongsTo(student_basic_details,{foreignKey:'student_basic_detail_id'})
// student_skills.belongsTo(student_basic_details,{foreignKey:'student_basic_detail_id'})

module.exports = {
  Donor,
};
