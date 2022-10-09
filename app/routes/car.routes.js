var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");
const cars = require("../controllers/car.controller.js");

router.get("/", cars.findAll);

router.get("/listcar", function (req, res) {
  res.render("listCar");
});

router.get("/add", cars.add);

const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post(
  "/add",
  cars.uploadFoto.single("foto"),
  cars.fileSizeLimitErrorHandler,
  cars.create
);

router.get("/edit/:id", cars.edit);

router.put("/edit/:id", cars.uploadFoto.single("foto"), cars.update);

router.delete("/delete/:id", cars.delete);

module.exports = router;
