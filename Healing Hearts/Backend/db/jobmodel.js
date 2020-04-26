const mongoose = require("mongoose");
const{Company,Job} =require('../db/comapnymodel')
const mongoosePaginate = require("mongoose-paginate")

  

    const studentjobs= new mongoose.Schema({

      job_id:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "job"
      },
      company_basic_detail_id:String,
      student_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "student"
      },
      student_basic_detail_id:String,
      resume:String,
      status:String
     },
     { timestamps: true })

    studentjobs.index({student_basic_detail_id: 1, job_id: 1}, {unique: true});
    studentjobs.plugin(mongoosePaginate);
    const StudentJobs= mongoose.model("studentjobs",studentjobs)
    
    
  
    
  module.exports={StudentJobs}