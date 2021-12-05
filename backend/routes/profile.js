const jwt = require("jsonwebtoken");
const md5 = require("md5");
const passport = require("passport");
const app = require("../app");
const { checkAuth } = require("../Utils/passport");
const { secret } = require("../Utils/config");
const { CustomerDetails, RestaurantDetails } = require("../schema/schema");
var kafka = require("../kafka/client");



app.post("/ubereats/profile/customer", checkAuth, async function (req, res) {
  kafka.make_request("profileCustomer", req.body, function (err, results) {
    console.log("Customer Profile response from Kafka Backend ", results);
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


app.post("/ubereats/profile/owner", checkAuth, async function (req, res) {
  kafka.make_request("profileOwner", req.body, function (err, results) {
    console.log("profileOwner response from Kafka Backend ", results);
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



app.get(
  "/ubereats/profile/owner/details/:restaurant_id",
  checkAuth,
  async function (req, res) {
    kafka.make_request(
      "getOwnerRestaurantDetails",
      req.params,
      function (err, results) {
        console.log("profileOwner response from Kafka Backend ", results);
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
      }
    );
  }
);
