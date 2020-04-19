const createError = require("http-errors");
const path = require("path");
const logger = require("morgan");
const express = require("express");
const body = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
// const MongoStore = require("connect-mongodb-session")(session);
const app = express();
const server = require("./graphQl/integrate");
const cors = require("cors");

app.use(body.urlencoded({ extended: false }));
app.use(cors());
const mongoURI = "mongodb+srv://rachit2501:covidextricate@cluster0-hqjrg.mongodb.net/test?retryWrites=true&w=majority";
const loc = path.join(__dirname,"build","index.html");
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to Mongodb"))
  .catch(() => console.log("Error Connecting to MongoDB"));

// app.use(logger("combined"));
app.use(express.static('build'))
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

app.get("/*", async (req, res) => {
  console.log(loc)
  console.log("sdljfkdslkfjlk")
  res.sendFile(loc);
});

module.exports = app;
