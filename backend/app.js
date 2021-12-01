/* eslint-disable prefer-template */
const express = require("express");
const graphqlHTTP = require("express-graphql");

const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    // origin: "http://3.15.190.156:3000",
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use((res, req, next) => {
  // res.header("Access-Control-Allow-Origin", "http://3.15.190.156:3000");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Orgin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Headers, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.header("Cache-Control", "no-cache");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,PATCH,POST,PUT,DELETE"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.use(passport.initialize());

module.exports = app;
