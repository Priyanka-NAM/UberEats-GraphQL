const jwt = require("jsonwebtoken");
const md5 = require("md5");
const passport = require("passport");
var kafka = require("../kafka/client");

const app = require("../app");

const { secret } = require("../Utils/config");
const { RestaurantDetails, Dishes } = require("../schema/schema");
const { checkAuth } = require("../Utils/passport");



app.post("/ubereats/dishes/adddish", checkAuth, async function (req, res) {
  kafka.make_request("dishesAddDish", req.body, function (err, results) {
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


app.post("/ubereats/dishes/updatedish", checkAuth, async function (req, res) {
  kafka.make_request("dishesUpdateDish", req.body, function (err, results) {
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
  "/ubereats/dishes/alldishes/:restaurant_id",
  checkAuth,
  async function (req, res) {
    kafka.make_request("getAllDishes", req.params, function (err, results) {
      console.log("getAllDishes response from Kafka Backend ", results);
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
  }
);
