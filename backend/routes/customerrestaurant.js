const jwt = require("jsonwebtoken");
const md5 = require("md5");
var kafka = require("../kafka/client");

const app = require("../app");
const { checkAuth } = require("../Utils/passport");
const { secret } = require("../Utils/config");
const {
  CustomerDetails,
  RestaurantDetails,
  Favorites,
} = require("../schema/schema");


app.get(
  "/ubereats/customerrestaurant/restaurantsearch/:search_input",
  checkAuth,
  async function (req, res) {
    kafka.make_request(
      "getSearchRestaurants",
      req.params,
      function (err, results) {
        console.log(
          "getSearch Restaurants response from Kafka Backend ",
          results
        );
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

app.get(
  "/ubereats/customerrestaurant/allrestaurants",
  checkAuth,
  async function (req, res) {
    kafka.make_request(
      "getAllRestaurants",
      req.params,
      function (err, results) {
        console.log("getAllRestaurants response from Kafka Backend ", results);
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



app.get(
  "/ubereats/customerrestaurant/restaurantdetails/:restaurant_id",
  checkAuth,
  async function (req, res) {
    kafka.make_request(
      "getRestaurantDetails",
      req.params,
      function (err, results) {
        console.log(
          "getRestaurantDetails response from Kafka Backend ",
          results
        );
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



app.get(
  "/ubereats/customerrestaurant/favourite/:customer_id",
  checkAuth,
  async function (req, res) {
    kafka.make_request(
      "getFavouriteRestaurants",
      req.params,
      function (err, results) {
        console.log(
          "getFavouriteRestaurants response from Kafka Backend ",
          results
        );
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



app.post(
  "/ubereats/customerrestaurant/updatefavourite",
  checkAuth,
  async function (req, res) {
    kafka.make_request(
      "updateFavoriteRestaurants",
      req.body,
      function (err, results) {
        console.log(
          "updateFavouriteRestaurants response from Kafka Backend ",
          results
        );
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
              return;
            } else if (errCode === 400) {
              res.status(400).send(results.data);
              return;
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
