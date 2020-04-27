var express = require("express");
var route = express.Router();
const { generateToken, decryptToken } = require("../service/tokenservice");
const { Donation } = require("../db/donationmodel");
const { Fundraiser } = require("../db/companymodel");
const { Donor } = require("../db/donormodel");
const jwt = require("jsonwebtoken");

route.get("/:fundraiserId", (req, res) => {
//   Decryptedtoken = decryptToken(req.headers.authorization);
//   if (Decryptedtoken.email !== null) {
//     Donor.findOne({ where: { emailId: Decryptedtoken.email } }).then(result => {
//       if (result) {
        Fundraiser.aggregate([
          {
            $group: {
              fundraiserId: msg.params.fundraiserId,
              count: { $count: "fundraiserId" }
            }
          }
        ]);
    //   } else {
    //     res.status(404).send({
    //       errors: {
    //         message: [Decryptedtoken.error]
    //       }
    //     });
    //   }
    // });
//   }
});
