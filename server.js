const express = require("express");
const layouts = require("express-ejs-layouts");
const cors = require("cors");
var path = require("path");
const bodyParser = require("body-parser");
var methodOverride = require("method-override");
const { check, validationResult } = require("express-validator");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(methodOverride("_method"));
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static("app/resources"));

app.use(layouts);

const db = require("./app/models");

db.sequelize
  .sync()
  .then(() => {
    console.log("sync db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});
/*
app.get("/", (req, res) => {
  res.render("layout");
});
*/
var router = require("./app/routes/car.routes");
app.use(router);
app.use("/", router);

app.use("/add", router);

app.use("/edit/:id", router);

app.use("/delete/:id", router);
//app.use("/listcar", router);
app.use("/api/cars", router);

app.use(express.static(path.join(__dirname, "resources")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//const urlencodedParser = bodyParser.urlencoded({ extended: false });

//require("./app/routes/car.routes");

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
