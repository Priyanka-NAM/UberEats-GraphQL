const express = require("express");
const jwt = require("jsonwebtoken");

const md5 = require("md5");

const db = require("../Utils/connection");
const { secret } = require("../Utils/config");
var kafka = require("../kafka/client");
const app = require("../app");
const { CustomerDetails, RestaurantDetails } = require("../schema/schema");


app.post("/ubereats/signin", async function (req, res) {
  kafka.make_request("signIn", req.body, function (err, results) {
    console.log("Sign In response from Kafka Backend ", results);
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
