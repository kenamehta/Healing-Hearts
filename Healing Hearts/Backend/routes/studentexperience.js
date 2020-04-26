var express = require("express");
var route = express.Router();
const { generateToken, decryptToken } = require("../service/tokenservice");

const { Student } = require("../db/studentmodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

route.get("/", async (req, res) => {
  Decryptedtoken = decryptToken(req.headers.authorization);
  try {
  if (Decryptedtoken.email !== null) {
    console.log(Decryptedtoken.email)
    await Student
      .findOne({
      
          emailId: Decryptedtoken.email
       
      })
      .then(tokenuser => {
        experience=tokenuser.experiences;
        res.status(201).send({experience})

      })
      .catch(err => {
        console.log(`error getting student basic details ${err}`);
      });
  } else {
    return res.json({
      errors: {
        message: [Decryptedtoken.error]
      }
    });
  }
  
   
   
  } catch (err) {
    res.status(403).send({
      errors: {
        err: "Unable to get experience"
      }
    });
  }
});

route.post("/", async (req, res) => {
  Decryptedtoken = decryptToken(req.headers.authorization);
  try {
  if (Decryptedtoken.email !== null) {
   
    await Student
      .findOne({
        emailId: Decryptedtoken.email
       } )
      .then(tokenuser => {
        console.log(tokenuser)

        tokenuser.experiences.push({
        
      job_id: req.body.experience.job_id,
      job_title: req.body.experience.job_title,
      employer: req.body.experience.employer,
      start_time: req.body.experience.start_time,
      end_time: req.body.experience.end_time,
      location: req.body.experience.location,
      description: req.body.experience.description

        })
        tokenuser.save(err => {
          if (err) {
            res.status(403).send({
              errors: {
                err: "Unable to add experience"
              }
            });
          } else {
            res.status(201).send(tokenuser.experiences);
          }
        });
      res.status(201).send({
        experiencearr
      });
      })
      .catch(err => {
        console.log(`error getting student basic details ${err}`);
      });
  } else {
    return res.json({
      errors: {
        message: [Decryptedtoken.error]
      }
    });
  }
 
   
  } catch (err) {
    console.log(err);
    res.status(403).send({
      errors: {
        err: "Unable to ADD experience"
      }
    });
  }
});

function checkNull(value) {
  var val = value ? value : " ";
  return val;
}

route.put("/", async (req, res) => {
  Decryptedtoken = decryptToken(req.headers.authorization);
  if (Decryptedtoken.email !== null) {
    await Student
      .findOne({
      
          emailId: Decryptedtoken.email
        
      })
      .then(async tokenuser => {
        var experiencearr=tokenuser.experiences;
        var updatedExperience=experiencearr.filter(e=>e._id==req.body.experience.job_id)
        console.log(updatedExperience)
        var restExperience=experiencearr.filter(e=>e._id!=req.body.experience.job_id)
        console.log(restExperience)
        var update={
         
              
                job_title: (req.body.experience.job_title)?req.body.experience.job_title:updatedExperience.job_id,
                employer: (req.body.experience.employer)?req.body.experience.employer:updatedExperience.employer,
                start_time: (req.body.experience.start_time)?req.body.experience.start_time:updatedExperience.start_time,
                end_time: (req.body.experience.end_time)?req.body.experience.end_time:updatedExperience.end_time,
                location: (req.body.experience.location)?req.body.experience.location:updatedExperience.location,
                description: (req.body.experience.description)?req.body.experience.description:updatedExperience.description
        }

      

      restExperience.push(update);
      console.log(restExperience)
      const filter={ emailId: Decryptedtoken.email}
      const updatearr={experiences: restExperience}
      await Student.findOneAndUpdate(filter,updatearr,{new:true,useFindAndModify:true})
      .then(res1=>{
        res.status(201).send(res1.experiences)
      })

      .catch(err => {
        console.log(`error getting student basic details ${err}`);
      });
    })
  } else {
    return res.json({
      errors: {
        message: [Decryptedtoken.error]
      }
    });
  }

  
});

route.delete('/', async(req,res)=>{
    console.log();
    console.log("In deleting name");
    var studentId;
    Decryptedtoken = decryptToken(req.headers.authorization);
    try {
      await 
      Student
        .findOne({
         
            emailId: Decryptedtoken.email
          
        })
        .then(async tokenuser => {
          var filterexperience=tokenuser.experiences.filter(e=>e._id!=req.body.data.experience.job_id)
        console.log(filterexperience)
        const filter={ emailId: Decryptedtoken.email}
        const updatearr={experiences: filterexperience}
        await Student.findOneAndUpdate(filter,updatearr,{new:true , useFindAndModify:true})
        .then(res1=>{
          res.status(201).send(res1.experiences)
              })
       
  
        })
        .catch(err =>{
          console.log(`error getting student basic details ${err}`)
        });
     
        
     
      }
  catch(err)
  {
    console.log(err+"error sdsad");
    res.status(500).send(
    {
  
      errors:{
        body:'cannot delete as record is not present'
      }
  
    }
 
  )
  }
  })
module.exports = route;
