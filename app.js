const createError = require("http-errors");
const path = require("path");
const logger = require("morgan");
const express = require("express");
const body = require("body-parser");
// const mongoose = require("mongoose");
const session = require("express-session");
// const MongoStore = require("connect-mongodb-session")(session);
const app = express();
const server = require("./graphQl/integrate");
const cors = require("cors");
app.use(body.urlencoded({ extended: false }));
app.use(cors());
// const mongoURI = "mongodb://localhost:27017/covidExtricate";
const loc = path.join(__dirname,"build","index.html");
// mongoose
//   .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Connected to Mongodb"))
//   .catch(() => console.log("Error Connecting to MongoDB"));

// app.use(logger("combined"));
// app.use(
//   session({
//     resave: true,
//     secret: "covidextricate",
//     saveUninitialized: true,
//     store: new MongoStore({
//       url: mongoURI,
//       autoReconnect: true,
//     }),
//   })
// );

server.applyMiddleware({ app, path: "/api" });

app.get("/",  (req, res) => {
  console.log(loc)
  console.log("klfjsdlkf")
  res.sendFile(__dirname+'/build/index.html');
});

app.listen(4000)
module.exports = app;
