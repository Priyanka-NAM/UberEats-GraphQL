// const jwt = require("jsonwebtoken");
// const md5 = require("md5");
// const passport = require("passport");
const app = require("../app");
const { checkAuth } = require("../Utils/passport");
var kafka = require("../kafka/client");

const { secret } = require("../Utils/config");
const { OrderDetails } = require("../schema/schema");


app.get(
  "/ubereats/orders/completedorders/restaurant/:restaurant_id",
  checkAuth,
  async function (req, res) {
    kafka.make_request(
      "getCompletedOrders",
      req.params,
      function (err, results) {
        console.log("getCompletedOrders response from Kafka Backend ", results);
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
  "/ubereats/orders/neworders/restaurant/:restaurant_id",
  checkAuth,
  async function (req, res) {
    kafka.make_request("getNewOrders", req.params, function (err, results) {
      console.log("getNewOrders response from Kafka Backend ", results);
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



app.get(
  "/ubereats/orders/cancelledorders/restaurant/:restaurant_id",
  checkAuth,
  async function (req, res) {
    kafka.make_request(
      "getCancelledOrders",
      req.params,
      function (err, results) {
        console.log("getCancelledOrders response from Kafka Backend ", results);
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
  "/ubereats/orders/orderstatus/customer/:customer_id",
  checkAuth,
  async function (req, res) {
    kafka.make_request("getOrderStatus", req.params, function (err, results) {
      console.log("getOrderStatus response from Kafka Backend ", results);
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



app.post(
  "/ubereats/orders/customer/neworder",
  checkAuth,
  async function (req, res) {
    kafka.make_request("ordersNewOrderAdd", req.body, function (err, results) {
      console.log("ordersNewOrderAdd response from Kafka Backend ", results);
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



app.post(
  "/ubereats/orders/neworders/update",
  checkAuth,
  async function (req, res) {
    kafka.make_request(
      "ordersNewOrderUpdate",
      req.body,
      function (err, results) {
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
  "/ubereats/orders/customer/orderupdate",
  checkAuth,
  async function (req, res) {
    kafka.make_request(
      "customerOrderUpdate",
      req.body,
      function (err, results) {
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
