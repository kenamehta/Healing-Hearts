

const mongoose = require("mongoose");

  




  

  const studentevent=
 new mongoose.Schema({
   
    
    event_detail_id:String,
    company_basic_detail_id:String,
    student_basic_detail_id:String

   
    },{ timestamps: true })

    studentevent.index({student_basic_detail_id: 1, event_detail_id: 1}, {unique: true});
  const StudentEvents= mongoose.model('studentevent',studentevent)

  //  event.belongsTo(company_basic_details,{foreignKey:'company_basic_detail_id'})
  //   student_basic_details.belongsToMany(event,{through:studentevents,foreignKey:'student_basic_detail_id'})   
  //   event.belongsToMany(student_basic_details,{through:studentevents,foreignKey:'event_detail_id'}) 

  module.exports={StudentEvents}