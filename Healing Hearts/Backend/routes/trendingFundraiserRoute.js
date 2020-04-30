var express = require("express");
var route = express.Router();
const { generateToken, decryptToken } = require("../service/tokenservice");
const { Donation } = require("../db/donationmodel");
const { Fundraiser } = require("../db/companymodel");
const { Donor } = require("../db/donormodel");
const jwt = require("jsonwebtoken");

route.get("/", async (req, res) => {
  Decryptedtoken = decryptToken(req.headers.authorization);
  if (Decryptedtoken.email !== null) {
    Donor.findOne({
      where: { emailId: Decryptedtoken.email }
    }).then(async result => {
      if (result) {
        const don = await Donation.aggregate([
          {
            $group: {
              _id: "$fundraiserId",
              count: { $sum: 1 }
            }
          },
          { $sort: { count: -1 } },
          // Optionally limit results
          { $limit: 5 }
        ]);
        let donations = [];
        const request = await don.map(async d => {
          let fund = await Fundraiser.findById(d._id);
          console.log(fund);
          let temp = {
            ...d,
            companyName: fund.companyName,
            title: fund.title,
            category: fund.category
          };
          donations.push(temp);
        });
        Promise.all(request).then(() => {
          res.status(200).send({ donations });
        });
      } else {
        res.status(404).send({
          errors: {
            message: [Decryptedtoken.error]
          }
        });
      }
    });
  }
});

module.exports = route;
