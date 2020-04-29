var express = require("express");
var route = express.Router();
const { generateToken, decryptToken } = require("../service/tokenservice");
const { generateUUID } = require("../service/uuidservice");
const passport = require("../authenticate/passport_init");
const key = require("../service/key");
const {
  validateUsername,
  validatePassword,
  validateEmail
} = require("../companymiddleware");

const jwt = require("jsonwebtoken");
var connection = require("../db_connection");
const bcrypt = require("bcrypt");
var multer = require("multer");

const { Donor } = require("../db/donormodel");

route.get(
  "/:studentnameFilter/:majorFilter/:skillFilter/:collegeFilter",
  async (req, res) => {
    console.log("----------getting all profiles");
    Decryptedtoken = decryptToken(req.headers.authorization);
    var { page, limit } = req.query;
    console.log(parseInt(page, 10));
    var options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
      sort: {
        name: 1
      }
    };
    if (
      req.params.studentnameFilter == "empty" &&
      req.params.majorFilter == "empty" &&
      req.params.skillFilter == "empty" &&
      req.params.collegeFilter == "empty"
    ) {
      try {
        await Donor.findOne({
          emailId: Decryptedtoken.email
        })
          .then(tokenuser => {
            console.log(tokenuser._id + "in details ------------------------");
            studentId = tokenuser._id;
            email = tokenuser.emailId;
            name = tokenuser.name;
          })
          .catch(err => {
            console.log(`error posting student journey ${err}`);
          });
        //   var aggregate=Donor.aggregate([
        //     { $unwind: "$educations" },
        //     { $match: { "educations.isPrimary": "1" } }
        //   ])
        // const studentarr = await Donor.aggregatePaginate(aggregate,options);
        // console.log(studentarr)
        // var newStudentarr = [];
        // var totalDocs=studentarr.totalDocs
        // studentarr.docs.map(e => {
        //   var skillArr = e.skills;
        //   var skillcommaseperated = "";
        //   skillArr.map(skill => {
        //     skillcommaseperated
        //       ? (skillcommaseperated =
        //           skillcommaseperated + "," + skill.skill_name)
        //       : (skillcommaseperated = skill.skill_name);
        //   });
        //   newStudent = { ...e, skills: skillcommaseperated };
        //   // newStudent.totalDocs=totalDocs;
        //   console.log(newStudent);
        //   newStudentarr.push(newStudent);
        // });
        // // newStudentarr.totalDocs=totalDocs;
        // //
        // res.status(201).send({
        //   newStudentarr,
        //   total:totalDocs
        // });
        let { page, limit } = req.query;
        let options = {
          limit: parseInt(limit, 10) || 10,
          page: parseInt(page, 10) || 1
        };
        const donors = await Donor.paginate({}, options);
        var totaldocs = donors.totalDocs;
        res.status(201).send({
          donors,
          total: totaldocs
        });
      } catch (err) {
        console.log(`error getting jobs ${err}`);
        res.status(500).send({
          errors: {
            body: err
          }
        });
      }
    } else {
      try {
        // await Donor.findOne({
        //   emailId: Decryptedtoken.email
        // })
        //   .then(tokenuser => {
        //     console.log(tokenuser._id + "in details ------------------------");
        //     studentId = tokenuser._id;
        //     email = tokenuser.emailId;
        //     name = tokenuser.name;
        //   })
        //   .catch(err => {
        //     console.log(`error posting student journey ${err}`);
        //   });
        console.log(req.params.studentnameFilter);
        let whereCondition = {};
        if (req.params.studentnameFilter !== "empty") {
          whereCondition = {
            ...whereCondition,
            name: {
              $regex: new RegExp(req.params.studentnameFilter, "i")
            }
          };
        }
        if (req.params.majorFilter !== "empty") {
          whereCondition = {
            ...whereCondition,
            title: {
              $regex: new RegExp(req.params.majorFilter, "i")
            }
          };
        }
        let { page, limit } = req.query;
        let options = {
          limit: parseInt(limit, 10) || 10,
          page: parseInt(page, 10) || 1
        };
        const donors = await Donor.paginate(whereCondition, options);
        if (donors) {
          res.status(200).send({ donors, total: donors.totalDocs });
        }
        // var aggregate=Donor.aggregate([
        //   { $unwind: "$educations" },
        //   {
        //     $match: {
        //       "educations.isPrimary": "1",
        //       $or: [
        //         {
        //           name: {
        //             $regex: new RegExp(req.params.studentnameFilter, "i")
        //           }
        //         },
        //         {
        //           college: {
        //             $regex: new RegExp(req.params.collegeFilter, "i")
        //           }
        //         },
        //         {
        //           "educations.major": {
        //             $regex: new RegExp(req.params.majorFilter, "i")
        //           }
        //         },
        //         {
        //           "skills.skill_name": {
        //             $regex: new RegExp(req.params.skillFilter, "i")
        //           }
        //         }
        //       ]
        //     }
        //   }
        // ]);

        // const studentarr = await Donor.aggregatePaginate(aggregate,options);
        // console.log(studentarr);
        // var newStudentarr = [];
        // studentarr.docs.map(e => {
        //   var skillArr = e.skills;
        //   var skillcommaseperated = "";
        //   skillArr.map(skill => {
        //     skillcommaseperated
        //       ? (skillcommaseperated =
        //           skillcommaseperated + "," + skill.skill_name)
        //       : (skillcommaseperated = skill.skill_name);
        //   });
        //   newStudent = { ...e, skills: skillcommaseperated };
        //   console.log(newStudent);
        //   newStudentarr.push(newStudent);
        // });

        // res.status(201).send({
        //   newStudentarr,
        //   total: studentarr.totalDocs
        // });
      } catch (err) {
        console.log(`error getting jobs ${err}`);
        res.status(500).send({
          errors: {
            body: err
          }
        });
      }
    }
  }
);

route.get("/education/:id", async (req, res) => {
  console.log(req.body);
  console.log("In get education");
  var studentId, student;
  Decryptedtoken = decryptToken(req.headers.authorization);
  try {
    await student_basic_details
      .findOne({
        where: {
          emailId: Decryptedtoken.email
        }
      })
      .then(tokenuser => {
        console.log(tokenuser.dataValues._id + "in details");
        studentId = tokenuser.dataValues._id;
        email = tokenuser.dataValues.emailId;
        name = tokenuser.dataValues.name;
      })
      .catch(err => {
        console.log(`error getting student basic details ${err}`);
      });

    const preeducation = await student_education.findAll({
      where: {
        _id: req.params.id
      }
    });

    if (preeducation) {
      res.status(201).send(preeducation);
    } else {
      res.status(403).send({
        errors: {
          err: "Unable to delete school"
        }
      });
    }
  } catch (err) {
    console.log(err + "error sdsad");
    res.status(500).send({
      errors: {
        body: "cannot delete as record is not present"
      }
    });
  }
});

route.get("/skills/:id", async (req, res) => {
  console.log(req.body);
  console.log("In get education");
  var studentId;
  Decryptedtoken = decryptToken(req.headers.authorization);
  try {
    await student_basic_details
      .findOne({
        where: {
          emailId: Decryptedtoken.email
        }
      })
      .then(tokenuser => {
        console.log(tokenuser.dataValues._id + "in details");
        studentId = tokenuser.dataValues._id;
        email = tokenuser.dataValues.emailId;
        name = tokenuser.dataValues.name;
      })
      .catch(err => {
        console.log(`error getting student basic details ${err}`);
      });

    const preeducation = await student_skills.findAll({
      where: {
        _id: req.params.id
      }
    });

    if (preeducation) {
      res.status(201).send(preeducation);
    } else {
      res.status(403).send({
        errors: {
          err: "Unable to get skills"
        }
      });
    }
  } catch (err) {
    console.log(err + "error sdsad");
    res.status(500).send({
      errors: {
        body: "cannot find key as record is not present"
      }
    });
  }
});

route.get("/journey/:id", async (req, res) => {
  console.log("----------getting journey");
  Decryptedtoken = decryptToken(req.headers.authorization);
  try {
    await student_basic_details
      .findOne({
        where: {
          emailId: Decryptedtoken.email
        }
      })
      .then(tokenuser => {
        console.log(
          tokenuser.dataValues._id + "in details ------------------------"
        );
        studentId = tokenuser.dataValues._id;
        email = tokenuser.dataValues.emailId;
        name = tokenuser.dataValues.name;
      })
      .catch(err => {
        console.log(`error posting student journey ${err}`);
      });

    const result = await student_profile.findOne({
      where: { _id: req.params.id }
    });
    console.log("sending journey-----------------" + result.career_objective);
    res.status(201).send({
      result: result.career_objective
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

route.get("/experience/:id", async (req, res) => {
  try {
    const experiencearr = await student_experience.findAll({
      where: {
        _id: req.params.id
      }
    });

    if (experiencearr) {
      res.status(201).send({
        experiencearr
      });
    }
  } catch (err) {
    res.status(403).send({
      errors: {
        err: "Unable to delete school"
      }
    });
  }
});

module.exports = route;
