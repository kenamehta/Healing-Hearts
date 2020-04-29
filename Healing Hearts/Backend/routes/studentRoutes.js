var express = require("express");
var route = express.Router();
const { generateToken, decryptToken } = require("../service/tokenservice");
const { generateUUID } = require("../service/uuidservice");
//const passport = require("../authenticate/passport_init");
const key = require("../service/key");
const mongoose = require("mongoose");
var multer = require("multer");
const passport = require("passport");
const {
  validateUsername,
  validatePassword,
  validateEmail
} = require("../studentmiddleware");

const { Donor } = require("../db/donormodel");
const { Donation } = require("../db/donationmodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

route.get("/servercheck", (req, res) => {
  res.status(200).send("Welcome to Handshake server");
});

route.get("/", async (req, res) => {
  console.log("In student route" + JSON.stringify(req.headers));
  Decryptedtoken = decryptToken(req.headers.authorization);

  console.log(Decryptedtoken.email);
  if (Decryptedtoken.email !== null) {
    const student = await Donor.findOne({
      emailId: Decryptedtoken.email
    });

    res.status(201).json({
      email: student.emailId,
      name: student.name,
      career_objective: student.about,
      profile_picture: student.profilePic,
      education: student.educations,
      skills: student.skills,
      experience: student.experiences,
      token: req.headers.authorization,
      college: student.college,
      city: student.city,
      country: student.country,
      phone: student.phone,
      dob: student.dob,
      state: student.state
    });
  }
});

route.get("/visit/:id", async (req, res) => {
  console.log("In student route" + JSON.stringify(req.headers));
 // Decryptedtoken = decryptToken(req.headers.authorization);

  // console.log(Decryptedtoken.email);
  // if (Decryptedtoken.email !== null) {
  const student = await Donor.findOne({
    _id: req.params.id
  });

  res.status(201).json({
    _id:student._id,
    email: student.emailId,
    name: student.name,
    career_objective: student.about,
    profilePic: student.profilePic,
    education: student.educations,
    skills: student.skills,
    experience: student.experiences,
    token: req.headers.authorization,
    college: student.college,
    city: student.city,
    country: student.country,
    phone: student.phone,
    dob: student.dob,
    state: student.state
  });
  // }
});

route.post(
  "/register",
  validateUsername,
  validatePassword,
  validateEmail,
  async (req, res) => {
    const studentid = await generateUUID();
    const studenttoken = await generateToken(req.body.student.email);
    console.log(req.body.student.email);

    try {
      const registerStudent = await Donor.create({
        emailId: req.body.student.email,
        password: bcrypt.hashSync(req.body.student.password, 10),
        name: req.body.student.name,
        title: req.body.student.title
      });
      console.log(req.body.student.name);

      res.status(201).send({
        user: {
          email: registerStudent.email,
          name: registerStudent.name,
          image: null,
          token: studenttoken,
          isRegister: true,
          resp: registerStudent
        }
      });
    } catch (err) {
      res.status(500).send({
        errors: {
          body: err
        }
      });
    }
  }
);
route.post("/journey", async (req, res) => {
  Decryptedtoken = decryptToken(req.headers.authorization);
  try {
    const filter = { emailId: Decryptedtoken.email };
    const update = { about: req.body.student.career_objective };
    await Donor.findOneAndUpdate(filter, update, {
      new: true,
      useFindAndModify: true
    })
      .then(tokenuser => {
        if (tokenuser) {
          res.status(201).send({
            result: tokenuser.career_objective
          });
        } else {
          res.status(403).send({
            errors: {
              body: "Unauthenticated user"
            }
          });
        }
      })
      .catch(err => {
        console.log(`error posting student journey ${err}`);
      });
  } catch (err) {
    console.log(`error posting student journey ${err}`);
    res.status(500).send({
      errors: {
        body: err
      }
    });
  }
});
route.post("/login", validateEmail, validatePassword, async (req, res) => {
  console.log(req.body.student.email);
  console.log("In login");

  const studenttoken = await generateToken(req.body.student.email);
  try {
    const student = await Donor.findOne({
      emailId: req.body.student.email
    });
    // console.log(student)
    if (student) {
      bcrypt.compare(req.body.student.password, student.password, function(
        err,
        isMatch
      ) {
        console.log(bcrypt.hashSync(req.body.student.password, 10));
        console.log(student.password);
        if (err) {
          res.status(500).send({
            errors: {
              body: err
            }
          });
        } else if (!isMatch) {
          res.status(403).send({
            errors: {
              body: "Unauthenticated User"
            }
          });
        } else {
          console.log("succesfully logged in");
          res.status(201).send({
            user: {
              emailId: student.email,
              name: student.name,
              image: null,
              token: studenttoken,
              resp: student,
              isLogin: true
            }
          });
        }
      });
    } else {
      res.status(401).send({
        errors: {
          body: "Unauthorised User"
        }
      });
    }
  } catch (err) {
    res.status(500).send({
      errors: {
        body: err
      }
    });
  }
});

route.get("/journey", async (req, res) => {
  console.log("----------getting journey");
  Decryptedtoken = decryptToken(req.headers.authorization);
  try {
    await Donor.findOne({
      emailId: Decryptedtoken.email
    })
      .then(tokenuser => {
        if (tokenuser) {
          studentId = tokenuser.student_basic_detail_id;
          email = tokenuser.emailId;
          name = tokenuser.name;
          result = tokenuser.career_objective;

          res.status(201).send({
            result: result
          });
        } else {
          res.status(401).send({
            errors: {
              body: "Unauthorised User"
            }
          });
        }
      })
      .catch(err => {
        console.log(`error posting student journey ${err}`);
      });
  } catch (err) {
    console.log(`error posting student journey ${err}`);
    res.status(500).send({
      errors: {
        body: err
      }
    });
  }
});

route.put("/name", async (req, res) => {
  console.log(req.body);
  console.log("In updating name");
  Decryptedtoken = decryptToken(req.headers.authorization);
  try {
    const filter = { emailId: Decryptedtoken.email };
    const update = { name: req.body.student.name };

    await Donor.findOneAndUpdate(filter, update, {
      new: true,
      useFindAndModify: true
    })
      .then(tokenuser => {
        res.status(201).send({
          tokenuser
        });
      })
      .catch(err => {
        console.log(`error getting student basic details ${err}`);
      });
  } catch (err) {
    res.status(403).send({
      error: {
        error: err
      }
    });
  }
});

route.post("/education", async (req, res) => {
  console.log(req.body);
  console.log("In updating name");
  var studentId;
  Decryptedtoken = decryptToken(req.headers.authorization);
  try {
    await Donor.findOne({
      emailId: Decryptedtoken.email
    })
      .then(tokenuser => {
        if (tokenuser) {
          tokenuser.educations.push({
            school_name: req.body.education.schoolname,
            education_level: req.body.education.educationlevel,
            major: req.body.education.major,
            minor: req.body.education.minor ? req.body.education.minor : "",
            start_time: req.body.education.startDate,
            end_time: req.body.education.endDate,
            gpa: req.body.education.gpa,
            isPrimary: req.body.education.isPrimary
          });
          tokenuser.save(err => {
            if (err) {
              res.status(403).send({
                errors: {
                  err: "Unable to add school"
                }
              });
            } else {
              res.status(201).send(tokenuser.educations);
            }
          });
        } else {
          res.status(403).send({
            errors: {
              err: "unauthenticated user"
            }
          });
        }
      })
      .catch(err => {
        console.log(`error getting student basic details ${err}`);
      });
  } catch (err) {
    console.log(err);
    res.status(403).send({
      errors: {
        err: err
      }
    });
  }
});

route.put("/education", async (req, res) => {
  console.log(req.body);
  console.log("In updating name");
  var studentId;
  Decryptedtoken = decryptToken(req.headers.authorization);
  try {
    console.log(req.body.education.gpa);
    const preeducation = await Donor.findOne({
      emailId: Decryptedtoken.email
    });
    console.log(preeducation.educations);
    // var doc=preeducation.educations._id(req.body.education.educationId)
    var educationarr = preeducation.educations;
    filteredEducation = educationarr.filter(
      e => e._id == req.body.education.educationId
    );
    restEducation = educationarr.filter(
      e => e._id != req.body.education.educationId
    );
    console.log("filtered=> " + filteredEducation);
    console.log(restEducation);

    const update = {
      school_name: req.body.education.schoolname
        ? req.body.education.schoolname
        : filteredEducation.school_name,
      education_level: req.body.education.educationlevel
        ? req.body.education.educationlevel
        : filteredEducation.education_level,
      major: req.body.education.major
        ? req.body.education.major
        : filteredEducation.major,
      minor: req.body.education.minor ? req.body.education.minor : "",
      start_time: req.body.education.startDate
        ? req.body.education.startDate
        : filteredEducation.start_time,
      end_time: req.body.education.endDate
        ? req.body.education.endDate
        : filteredEducation.end_time,
      gpa: req.body.education.gpa
        ? req.body.education.gpa
        : filteredEducation.GPA,
      isPrimary: req.body.education.isPrimary
        ? req.body.education.isPrimary
        : filteredEducation.isPrimary
    };

    restEducation.push(update);
    console.log(restEducation);

    const filter = { emailId: Decryptedtoken.email };
    const updatearr = { educations: restEducation };
    await Donor.findOneAndUpdate(filter, updatearr, {
      new: true,
      useFindAndModify: true
    }).then(res1 => {
      res.status(201).send(res1.educations);
    });
  } catch (err) {
    console.log(err);
    res.status(403).send({
      errors: {
        err: err
      }
    });
  }
});

route.delete("/education", async (req, res) => {
  console.log(req.body);
  console.log("In deleting name");
  var studentId;
  Decryptedtoken = decryptToken(req.headers.authorization);
  try {
    await Donor.findOne({
      emailId: Decryptedtoken.email
    })
      .then(async tokenuser => {
        studentId = tokenuser.student_basic_detail_id;
        var filtereducation = tokenuser.educations.filter(
          e => e._id != req.body.data.education.educationId
        );
        console.log(filtereducation);
        const filter = { emailId: Decryptedtoken.email };
        const updatearr = { educations: filtereducation };
        await Donor.findOneAndUpdate(filter, updatearr, {
          new: true,
          useFindAndModify: true
        }).then(res1 => {
          res.status(201).send(res1.educations);
        });
      })
      .catch(err => {
        console.log(`error getting student basic details ${err}`);
      });
  } catch (err) {
    console.log(err + "error sdsad");
    res.status(500).send({
      errors: {
        body: "cannot delete as record is not present"
      }
    });
  }
});

route.get("/education", async (req, res) => {
  console.log(req.body);
  console.log("In get education");
  var studentId;
  Decryptedtoken = decryptToken(req.headers.authorization);
  try {
    await Donor.findOne({
      emailId: Decryptedtoken.email
    })
      .then(tokenuser => {
        res.status(201).send(tokenuser.educations);
      })
      .catch(err => {
        console.log(`error getting student basic details ${err}`);
      });
  } catch (err) {
    console.log(err + "error sdsad");
    res.status(500).send({
      errors: {
        body: "cannot delete as record is not present"
      }
    });
  }
});

route.post("/picture", upload.single("myimage"), async (req, res) => {
  console.log(JSON.stringify(req.file) + " file post");

  var studentId;
  Decryptedtoken = decryptToken(req.headers.authorization);
  try {
    await Donor.findOne({
      emailId: Decryptedtoken.email
    })
      .then(tokenuser => {
        console.log(tokenuser.student_basic_detail_id + "in details");
        studentId = tokenuser.student_basic_detail_id;
        email = tokenuser.emailId;
        name = tokenuser.name;
      })
      .catch(err => {
        console.log(`error getting student basic details ${err}`);
      });

    //  var imageData = fs.readFileSync(req.file.path);
    // console.log(imageData)
    const result = await Donor.findOneAndUpdate(
      { student_basic_detail_id: studentId },
      { profilePic: req.file.originalname },
      { new: true, useFindAndModify: true }
    );

    if (result) {
      console.log(result);
      res.status(201).send({ name: req.file.originalname });
    } else {
      res.status(403).send({
        errors: {
          err: "Unable to add school"
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

route.get("/picture", async (req, res) => {
  var studentId;
  Decryptedtoken = decryptToken(req.headers.authorization);
  try {
    await Donor.findOne({
      emailId: Decryptedtoken.email
    })
      .then(tokenuser => {
        console.log(tokenuser.student_basic_detail_id + "in details");
        studentId = tokenuser.student_basic_detail_id;
        email = tokenuser.emailId;
        name = tokenuser.name;
      })
      .catch(err => {
        console.log(`error getting student basic details ${err}`);
      });

    Donor.findOne({
      student_basic_detail_id: studentId
    })
      .then(profile => {
        res.json({ success: true, data: profile });
      })
      .catch(err => {
        console.log("in error :: /api/getProfilePic");
      });
  } catch (err) {
    console.log(err);
    res.status(403).send({
      errors: {
        err: err
      }
    });
  }
});

route.post("/skills", async (req, res) => {
  console.log(req.body);
  console.log("In posting skills");
  var studentId;
  Decryptedtoken = decryptToken(req.headers.authorization);
  try {
    console.log(Decryptedtoken.email);

    await Donor.findOne({
      emailId: Decryptedtoken.email
    })
      .then(tokenuser => {
        if (tokenuser) {
          tokenuser.skills.push({ skill_name: req.body.student.skill_name });

          tokenuser.save(err => {
            if (err) {
              res.status(403).send({
                errors: {
                  err: "Unable to add school"
                }
              });
            } else {
              res.status(201).send(tokenuser.skills);
            }
          });
        } else {
          res.status(403).send({
            errors: {
              err: "Unauthenticated User"
            }
          });
        }
      })
      .catch(err => {
        console.log(`error getting student basic details ${err}`);
      });
  } catch (err) {
    console.log(err);
    res.status(403).send({
      errors: {
        err: err
      }
    });
  }
});

///// Get for skills

route.get("/skills", async (req, res) => {
  console.log(req.body);
  console.log("In get education");
  var studentId;
  Decryptedtoken = decryptToken(req.headers.authorization);
  try {
    await Donor.findOne({
      emailId: Decryptedtoken.email
    })
      .then(tokenuser => {
        res.status(201).send(tokenuser.skills);
      })
      .catch(err => {
        console.log(`error getting student basic details ${err}`);
      });
  } catch (err) {
    console.log(err + "error sdsad");
    res.status(500).send({
      errors: {
        body: "cannot find key as record is not present"
      }
    });
  }
});

route.delete("/skills", async (req, res) => {
  console.log();
  console.log("In deleting name");
  var studentId;
  Decryptedtoken = decryptToken(req.headers.authorization);
  try {
    await Donor.findOne({
      emailId: Decryptedtoken.email
    })
      .then(async tokenuser => {
        var skillarr = tokenuser.skills.filter(
          e => e._id != req.body.data.skills.skill_id
        );
        console.log(skillarr);
        const filter = { emailId: Decryptedtoken.email };
        const update = { skills: skillarr };
        await Donor.findOneAndUpdate(filter, update, {
          new: true,
          useFindAndModify: true
        }).then(res1 => {
          res.status(201).send(res1.skills);
        });
      })
      .catch(err => {
        console.log(`error getting student basic details ${err}`);
      });
  } catch (err) {
    console.log(err + "error sdsad");
    res.status(500).send({
      errors: {
        body: "cannot delete as record is not present"
      }
    });
  }
});

route.post("/basicdetails", async (req, res) => {
  Decryptedtoken = decryptToken(req.headers.authorization);
  console.log(req.body.basicdetails.studentstate);
  try {
    console.log(Decryptedtoken.email);
    await Donor.findOne({
      emailId: Decryptedtoken.email
    })
      .then(async tokenuser => {
        const filter = { emailId: Decryptedtoken.email };

        const result = await Donor.findOneAndUpdate(
          filter,
          {
            dob: req.body.basicdetails.dob
              ? req.body.basicdetails.dob
              : tokenuser.dob,
            state: req.body.basicdetails.studentstate
              ? req.body.basicdetails.studentstate
              : tokenuser.studentstate,
            city: req.body.basicdetails.city
              ? req.body.basicdetails.city
              : tokenuser.city,
            country: req.body.basicdetails.country
              ? req.body.basicdetails.country
              : tokenuser.country,
            email: req.body.basicdetails.email
              ? req.body.basicdetails.email
              : tokenuser.emailId,
            phone: req.body.basicdetails.phone
              ? req.body.basicdetails.phone
              : tokenuser.phone
          },
          { new: true, useFindAndModify: true }
        );
        res.status(201).send({
          result: {
            student: {
              email: req.body.basicdetails.email
                ? req.body.basicdetails.email
                : tokenuser.emailId,
              student_basic_details: {
                dob: req.body.basicdetails.dob
                  ? req.body.basicdetails.dob
                  : tokenuser.dob,
                city: req.body.basicdetails.city
                  ? req.body.basicdetails.city
                  : tokenuser.city,
                state: req.body.basicdetails.studentstate
                  ? req.body.basicdetails.studentstate
                  : tokenuser.studentstate,
                country: req.body.basicdetails.country
                  ? req.body.basicdetails.country
                  : tokenuser.country,
                phone: req.body.basicdetails.phone
                  ? req.body.basicdetails.phone
                  : tokenuser.phone_number
              }
            }
          }
        });
      })
      .catch(err => {
        console.log(`error posting student journey ${err}`);
      });
  } catch (err) {
    console.log(`error posting student journey ${err}`);
    res.status(500).send({
      errors: {
        body: err
      }
    });
  }
});

route.post("/upload/:id", upload.single("myimage"), async (req, res) => {
  console.log(req.file, "filee");
  console.log("applying for job");
  var studentId;
  var studentObjectId;
  var student;
  Decryptedtoken = decryptToken(req.headers.authorization);
  try {
    await Donor.findOne({
      emailId: Decryptedtoken.email
    })
      .then(tokenuser => {
        student = tokenuser;
        studentId = tokenuser.student_basic_detail_id;
        studentObjectId = tokenuser._id;
      })
      .catch(err => {
        console.log(`error getting student basic details ${err}`);
      });

    // console.log(student, "-----------------------------------", bookId);
    const result = await Donation.create({
      job_id: req.params.id,
      status: "Pending",
      student_basic_detail_id: student.student_basic_detail_id,
      resume: req.file ? req.file.originalname : "",
      student_id: studentObjectId
    });
    if (result) {
      res.status(201).send(result);
    }
  } catch (err) {
    console.log(err);
    res.status(403).send(err.name);
  }
});

module.exports = route;
