var express = require("express");
var route = express.Router();
const { generateToken, decryptToken } = require("../service/tokenservice");
const { generateUUID } = require("../service/uuidservice");
const passport = require("../authenticate/passport_init");
const key = require("../service/key");
const { Company } = require("../db/companymodel");
const{StudentEvents} =require("../db/eventmodel")
const {
 Student
} = require("../db/studentmodel");


const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



route.get('/:locationAndTitleFilter',async(req,res)=>{
     console.log("----------getting jobs")
  Decryptedtoken = decryptToken(req.headers.authorization);
  try {
    var {page,limit}=req.query;
    console.log(parseInt(page,10))
    var options={
      page:parseInt(page,10)||1,
      limit:parseInt(limit,10)||10,
      sort:{
        date:1
      }
    }
    await Student
      .findOne({
      
          emailId: Decryptedtoken.email
       
      })
      .then(tokenuser => {
       
        console.log(
          tokenuser.student_basic_detail_id + "in details ------------------------"
        );
        studentId = tokenuser.student_basic_detail_id;
        email = tokenuser.emailId;
        name= tokenuser.name;
        
       
      })
      .catch(err =>{
        console.log(`error posting student journey ${err}`)
      });
      var whereCondition={}
      if (req.params.locationAndTitleFilter !== "empty") {
        console.log("inside if clause for company_fiiilter");
        whereCondition = {
          ...whereCondition,
          $or: [
            {
              location: { $regex: new RegExp(req.params.locationAndTitleFilter, "i") }
            },
            { event_name: { $regex: new RegExp(req.params.locationAndTitleFilter, "i") } }
          ]
        };
      }
  
    console.log(whereCondition)
      const result = await Event.paginate(
       whereCondition,options
      
      )
      console.log("sending jobs-----------------"+result)
      res.status(201).send(
        {
          result:result.docs,
          total:result.total
        }
      )
}
catch(err)
{
  console.log(`error getting jobs ${err}`)
  res.status(500).send({
    errors: {
      body: err
    }

})
}
})

route.post('/register',async  (req, res, next) => {
  
  console.log(req.body);
    console.log("registering for event")
     var studentId;
     var student;
     var educationarr;
  Decryptedtoken = decryptToken(req.headers.authorization);
  try {
    await Student
      .findOne({
      
          emailId: Decryptedtoken.email
        
      })
      .then(tokenuser => {
        if(tokenuser){
        console.log(
          tokenuser.student_basic_detail_id + "in details"
        );
        student=tokenuser
        studentId = tokenuser.student_basic_detail_id;
        email = tokenuser.emailId;
        name= tokenuser.name;
        educationarr= tokenuser.educations
        }
        else{
          res.status(403).send({
            errors: {
              body: "unauthenticated user"
            }
        
        })
        }
      })
      .catch(err =>{
        console.log(`error getting student basic details ${err}`)
      });
    
    //getting major of current college
        
    var mainEducation=educationarr.filter(e=>e.isPrimary=='1')

    if(req.body.event.major.toLowerCase().includes('all')||req.body.event.major.toLowerCase().includes(mainEducation.major.toLowerCase()))
    {
    const result=await StudentEvents.create({
           
             event_detail_id:req.body.event.event_id,
             student_basic_detail_id:student.student_basic_detail_id
    
    })
    if(result)
    {
        res.status(201).send(result)
    }
    }
    else{
        res.status(403).send({
            eligible:'Not Eligible'
        })
    }
}
catch(err)
{
  console.log(err)
  res.status(403).send(err.name)
}
})


route.get('/registered',async(req,res)=>{
     console.log("----------getting jobs")
     var studentId;
  Decryptedtoken = decryptToken(req.headers.authorization);
  try {
    await Student
      .findOne({
       
          emailId: Decryptedtoken.email
        
      })
      .then(tokenuser => {
        console.log(
          tokenuser.student_basic_detail_id + "in details ------------------------"
        );
        studentId = tokenuser.student_basic_detail_id;
        email = tokenuser.emailId;
        name= tokenuser.name;

      })
      .catch(err =>{
        console.log(`error posting student journey ${err}`)
      });
    console.log(studentId)
      const result = await StudentEvents.find({

       
            student_basic_detail_id:studentId
              
    
      }
      )

        let eventIdArr=[]
      result.map(i=>{
          eventIdArr.push(i.event_detail_id)
      })
      console.log(eventIdArr);

      const finalresult= await Event.find({
         
              _id:{"$in":eventIdArr}
        

      })    
      
     
      console.log("sending jobs-----------------"+finalresult)
      res.status(201).send(
        {
          result:finalresult 
        }
      )
}
catch(err)
{
  console.log(`error getting events ${err}`)
  res.status(500).send({
    errors: {
      body: err
    }

})
}
})

route.post('/isregistered',async(req,res)=>{
     console.log("----------getting registered events")
  Decryptedtoken = decryptToken(req.headers.authorization);
  try {
    var studentId;
    await Student
      .findOne({
       
          emailId: Decryptedtoken.email
        
      })
      .then(tokenuser => {
        if(tokenuser){
        console.log(
          tokenuser.student_basic_detail_id + "in details ------------------------"
        );
        studentId = tokenuser.student_basic_detail_id;
        email = tokenuser.emailId;
        name= tokenuser.name;
        }
        else{
          res.status(403).send({
            errors: {
              body: "unauthenticated user"
            }
        
        })
        }
      })
      .catch(err =>{
        console.log(`error posting student journey ${err}`)
      });
    
      const result = await StudentEvents.findOne({

       
            student_basic_detail_id:studentId,
            event_detail_id:req.body.event.event_id
              
    
      }
      )
      if(result)
      {
   // console.log("sending jobs-----------------"+result)
      res.status(201).send(
        {
          result:{
              registered:true
          } 
        }
      )
      }
      else{
          console.log("sending jobs-----------------"+result)
      res.status(201).send(
        {
          result:{
              registered:false
          } 
        }
      )
      }
      
}
catch(err)
{
  console.log(`error getting events ${err}`)
  res.status(500).send({
    errors: {
      body: err
    }

})
}
})


route.get("/:id/students", async (req, res) => {
  console.log("----------getting all students");
  Decryptedtoken = decryptToken(req.headers.authorization);
  try {
    await Company
      .findOne({
       
          emailId: Decryptedtoken.email
        
      })
      .then(tokenuser => {
        if(tokenuser){
        console.log(
          tokenuser.company_basic_detail_id +
            "in details ------------------------"
        );
        studentId = tokenuser.company_basic_detail_id;
        email = tokenuser.emailId;
        name = tokenuser.company_name;
        }
        else{
          res.status(403).send({
            errors: {
              body: "unauthenticated user"
            }
        
        })
        }
      })
      .catch(err => {
        console.log(`getting students who applied for this event ${err}`);
      });
      studentIdarr=[]
    StudentEvents.find({
      event_detail_id:req.params.id
    }).then(async tokenuser=>{
      tokenuser.map(e=>studentIdarr.push(e.student_basic_detail_id))
      
      await Student.find({
        student_basic_detail_id:{"$in":studentIdarr}
      }).then(tokenuser1=>{
        res.send({
                  success: true,
                  msg: "Successfully fetched student registered for events",
                  msgDesc: tokenuser1
                });
      })
   
    })

    

    //connection.query(
    //   `SELECT 
    //      a.*,b.*,e.*
    //  FROM
    //      handshake.student_basic_details as a
        
    //       INNER JOIN
    //      studentevents b ON a.student_basic_detail_id = b.student_basic_detail_id
    //          INNER JOIN
    //      handshake.student_educations e
    //  ON
    //      a.college = e.school_name
    //          AND a.student_basic_detail_id = e.student_basic_detail_id
    //          where b.event_detail_id=?
    //          `,
    //   [req.params.id],
    //   (err, results, fields) => {
    //     if (err) {
    //       res.send({
    //         success: false,
    //         msg: "Something went wrong",
    //         msgDesc: err
    //       });
    //     } else {
    //       res.send({
    //         success: true,
    //         msg: "Successfully fetched student registered for events",
    //         msgDesc: results
    //       });
    //     }
    //   }
    // );

  } catch (err) {
    console.log(`error getting jobs ${err}`);
    res.status(500).send({
      errors: {
        body: err
      }
    });
  }
});

route.post('/', async(req,res)=>{
  Decryptedtoken = decryptToken(req.headers.authorization);
  try {
    var companyId;
    await Company
      .findOne({
      
          emailId: Decryptedtoken.email
        
      })
      .then(tokenuser => {
        if(tokenuser){
        console.log(
          tokenuser.company_basic_detail_id +
            "in details ------------------------"
        );
        companyId = tokenuser.company_basic_detail_id;
        email = tokenuser.emailId;
        name = tokenuser.company_name;
        }
        else{
          res.status(403).send({
            errors: {
              err: "Unauthenticated user"
            }
          });
        }
      })
      .catch(err => {
        console.log(`posting events ${err}`);
      });

    const result = await Event.create({
      event_name: req.body.event.event_name,
      event_time: req.body.event.event_time,
      location: req.body.event.location,
      eligibility: req.body.event.eligibility,
      date: req.body.event.date,
      event_description: req.body.event.event_description,
      company_basic_detail_id: companyId,
      company_name:req.body.event.company_name
    });

    if (result) {
      
      const eventarr=await Event.find({})
      res
        .status(201)
        .send({
          eventarr
        });
    } else {
      res.status(403).send({
        errors: {
          err: "Unable to add event"
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(403).send({
      errors: {
        err: err
      }
    });
  }
});



module.exports=route;