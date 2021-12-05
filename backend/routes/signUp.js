const jwt = require("jsonwebtoken");
const md5 = require("md5");
const app = require("../app");
var kafka = require("../kafka/client");

const { secret } = require("../Utils/config");
const { CustomerDetails, RestaurantDetails } = require("../schema/schema");



app.post("/ubereats/signup/customer", async function (req, res) {
  kafka.make_request("signUpCustomer", req.body, function (err, results) {
    console.log("Sign Up response from Kafka Backend ", results);
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
      return;
    } else {
      if (results.errCode) {
        const errCode = results.errCode;
        if (errCode === 500) {
          res.writeHead(500, {
            "Content-Type": "text/plain",
          });
          res.end();
        } else if (errCode === 400) {
          res.status(400).send(results.data);
        }
        return;
      } else {
        res.send(results.data);
        return;
      }
    }
  });
});



app.post("/ubereats/signup/owner", async function (req, res) {
  kafka.make_request("signUpOwner", req.body, function (err, results) {
    console.log("Sign Up response from Kafka Backend ", results);
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
      return;
    } else {
      if (results.errCode) {
        const errCode = results.errCode;
        if (errCode === 500) {
          res.writeHead(500, {
            "Content-Type": "text/plain",
          });
          res.end();
        } else if (errCode === 400) {
          res.status(400).send(results.data);
        }
        return;
      } else {
        res.send(results.data);
        return;
      }
    }
  });
});
