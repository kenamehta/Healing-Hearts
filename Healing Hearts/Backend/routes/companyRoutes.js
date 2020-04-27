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

const { Company } = require("../db/companymodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var multer = require("multer");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

route.post(
  "/register",
  validateUsername,
  validatePassword,
  validateEmail,
  async (req, res) => {
    const companytoken = await generateToken(req.body.company.email);
    console.log(req.body.company);

    try {
      const registerCompany = await Company.create({
        emailId: req.body.company.email,
        password: bcrypt.hashSync(req.body.company.password, 10),
        companyName: req.body.company.company_name,
        location: req.body.company.location,
        phone: req.body.company.phone
      });
      // console.log(registerCompany);

      res.status(201).json({
        company: {
          email: registerCompany.emailId,
          company_name: registerCompany.companyName,
          image: null,
          token: companytoken,
          res: registerCompany
        }
      });
    } catch (err) {
      res.status(500).json({
        errors: {
          body: err
        }
      });
    }
  }
);

route.post("/login", validateEmail, validatePassword, async (req, res) => {
  const companytoken = await generateToken(req.body.company.email);
  try {
    const company = await Company.findOne({
      emailId: req.body.company.email
    });
    // console.log(company)
    if (company) {
      bcrypt.compare(req.body.company.password, company.password, function(
        err,
        isMatch
      ) {
        console.log(bcrypt.hashSync(req.body.company.password, 10));
        console.log(company.password);
        if (err) {
          res.status(500).json({
            errors: {
              body: err
            }
          });
        } else if (!isMatch) {
          res.status(403).json({
            errors: {
              body: "Unauthenticated User"
            }
          });
        } else {
          console.log("succesfully logged in");
          res.status(201).json({
            user: {
              emailId: company.email,
              name: company.name,
              image: null,
              token: companytoken,
              res: company
            }
          });
        }
      });
    } else {
      res.status(401).json({
        errors: {
          body: "Unauthorised User"
        }
      });
    }
  } catch (err) {
    res.status(500).json({
      errors: {
        body: err
      }
    });
  }
});

route.post("/details", async (req, res) => {
  console.log("----------posting company details in real");
  Decryptedtoken = decryptToken(req.headers.authorization);
  console.log(Decryptedtoken.email);
  try {
    await Company.findOne({
      emailId: Decryptedtoken.email
    })
      .then(tokenuser => {
        console.log(tokenuser);

        companyId = tokenuser.company_basic_detail_id;
        email = tokenuser.emailId;
        name = tokenuser.company_name;
      })
      .catch(err => {
        console.log(`error posting company details ${err}`);
      });
    const filter = { company_basic_detail_id: companyId };
    const update = { description: req.body.company.description };
    const result = await Company.findOneAndUpdate(filter, update, {
      new: true
    });

    if (result) {
      console.log(result);
      res.status(201).send(result);
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

route.get("/", async (req, res) => {
  console.log("----------posting company details");
  Decryptedtoken = decryptToken(req.headers.authorization);
  console.log(Decryptedtoken.email);
  try {
    await Company.findOne({
      emailId: Decryptedtoken.email
    })
      .then(tokenuser => {
        if (tokenuser) {
          res.status(201).send({
            company: {
              company_basic_details: tokenuser
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
        console.log(`error posting student journey ${err}`);
      });
    //console.log(companyId);
  } catch (err) {
    console.log(err);
    res.status(403).send({
      errors: {
        err: err
      }
    });
  }
});

route.put("/", async (req, res) => {
  console.log(req.body);
  console.log("In updating company");
  var studentId;
  Decryptedtoken = decryptToken(req.headers.authorization);
  console.log(Decryptedtoken.email);
  try {
    let name, companyId, phone;
    await Company.findOne({
      emailId: Decryptedtoken.email
    }).then(async tokenuser => {
      companyId = tokenuser.company_basic_detail_id;
      name = req.body.company.name
        ? req.body.company.name
        : tokenuser.company_name;
      location = req.body.company.location
        ? req.body.company.location
        : tokenuser.location;
      phone = req.body.company.phone ? req.body.company.phone : tokenuser.phone;

      const filter = { company_basic_detail_id: companyId };

      const update = {
        company_name: name,
        location: location,
        phone: phone
      };
      const result = await Company.findOneAndUpdate(filter, update, {
        new: true
      });

      if (result) {
        console.log(result);
        res.status(201).send({
          company: {
            company_basic_details: result
          }
        });
      } else {
        res.status(403).send({
          errors: {
            err: "Unable to add school"
          }
        });
      }
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

route.get("/:id", async (req, res) => {
  console.log("----------getting particular company details");
  Decryptedtoken = decryptToken(req.headers.authorization);
  try {
    var companyId;
    await Company.findOne({
      emailId: Decryptedtoken.email
    })
      .then(tokenuser => {
        company = tokenuser.dataValues;
        companyId = tokenuser.dataValues.company_basic_detail_id;
        email = tokenuser.dataValues.emailId;
        name = tokenuser.dataValues.company_name;
      })
      .catch(err => {
        console.log(`error getting company details ${err}`);
      });

    const companybasic = await Company.findOne({
      company_basic_detail_id: req.params.id
    });

    if (companybasic) {
      res.status(201).send({
        company: {
          company_basic_details: companybasic
        }
      });
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

route.post("/picture", upload.single("myimage"), async (req, res) => {
  console.log(JSON.stringify(req.file) + " file post");

  var companyId;
  Decryptedtoken = decryptToken(req.headers.authorization);
  try {
    await Company.findOne({
      emailId: Decryptedtoken.email
    })
      .then(tokenuser => {
        if (tokenuser) {
          console.log(tokenuser._id + "in details");
          companyId = tokenuser._id;
          email = tokenuser.emailId;
          name = tokenuser.name;
        } else {
          res.status(403).send({
            errors: {
              err: "unauthenticated user"
            }
          });
        }
      })
      .catch(err => {
        console.log(`error getting company basic details ${err}`);
      });

    const filter = { _id: companyId };
    const update = { profilePic: req.file.originalname };

    const result = await Company.findOneAndUpdate(filter, update, {
      new: true,
      useFindAndModify: true
    });

    if (result) {
      console.log(result);
      res.status(201).send({ name: req.file.originalname });
    } else {
      res.status(403).send({
        errors: {
          err: "Unable to add company photo"
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

module.exports = route;
