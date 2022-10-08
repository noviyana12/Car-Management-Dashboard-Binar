var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");
const cars = require("../controllers/car.controller.js");
/*
router.get("/", function (req, res) {
  res.render("layout");
});
*/
router.get("/", cars.findAll);

router.get("/listcar", function (req, res) {
  res.render("listCar");
});

router.get("/add", cars.add);

const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post("/add", cars.uploadFoto.single("foto"), cars.create);

router.get("/edit/:id", cars.edit);

router.put("/edit/:id", cars.uploadFoto.single("foto"), cars.update);

router.delete("/delete/:id", cars.delete);
/*
router.post("/add", urlencodedParser, (req, res) => {
  res.json(req.body);
});
*/
module.exports = router;

/*
module.exports = (app) => {
  const cars = require("../controllers/car.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  /*
  router.get("/", function (req, res) {
    res.render("layout");
  });
  */

/*
  router.get("/", function (req, res) {
    res.send("Hello World");
  });
  router.post("/", cars.create);
  //router.get("/", cars.findAll);
  router.put("/:id", cars.update);
  router.delete("/:id", cars.delete);

  
};
*/
