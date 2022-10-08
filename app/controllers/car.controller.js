const fs = require("fs");

const db = require("../models");
const Car = db.cars;
const Op = db.Sequelize.Op;

const multer = require("multer");

const cloudinary = require("cloudinary");
//const dotenv = require("dotenv");

/* HANDLING IMAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./app/resources/static/assets/uploads");
  },
  filename: function (req, file, cb) {
    const mimeExtension = {
      "image/jpeg": ".jpeg",
      "image/jpg": ".jpg",
      "image/png": ".png",
      "image/gif": ".gif",
    };
    cb(null, file.fieldname + "-" + Date.now() + mimeExtension[file.mimetype]);
  },
});

exports.uploadFoto = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log(file.mimetype);
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/gif"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      req.fileError = "File format is not valid";
    }
  },
});

exports.add = (req, res) => {
  res.render("addCar");
};

exports.create = (req, res) => {
  if (!req.body.nama) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  console.log(req.file);
  const car = {
    nama: req.body.nama,
    sewaharian: req.body.sewaharian,
    ukuran: req.body.ukuran,
    foto: req.file.filename,
  };

  // Save Tutorial in the database
  Car.create(car)
    .then((data) => {
      //res.send(data);
      return res.redirect("/");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating cars",
      });
    });
};

exports.findAll = (req, res) => {
  //res.render("listCar");

  const nama = req.query.nama;
  var condition = nama ? { nama: { [Op.like]: `%${nama}%` } } : null;

  Car.findAll({ where: condition })
    .then((data) => {
      //res.render("listCar");
      //res.send(data);
      // var data = data;
      //var subheading = "I though we should involve some magic";
      res.render("listCar", { data: data });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving cars.",
      });
    });
};

exports.edit = (req, res) => {
  //res.render("editCar");

  const id = req.params.id;

  Car.findByPk(id)
    .then((data) => {
      if (data) {
        //res.send(data);
        //return res.redirect("/");
        res.render("editCar", { data: data });
      } else {
        res.status(404).send({
          message: `Cannot find Car with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Car with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  //return res.json(req.body);
  const id = req.params.id;

  const reqBody = {
    nama: req.body.nama,
    sewaharian: req.body.sewaharian,
    ukuran: req.body.ukuran,
    foto: req.file.filename,
  };

  Car.update(reqBody, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        /*
          res.send({
            message: "Car was updated successfully.",
          });
*/
        return res.redirect("/");
        //return res.json(req.file);
      } else {
        res.send({
          message: `Cannot update Car with id=${id}. Maybe Car was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Car with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Car.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        /*
        res.send({
          message: "Car was deleted successfully!",
        });
        */
        return res.redirect("/");
      } else {
        res.send({
          message: `Cannot delete Car with id=${id}. Maybe Car was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Car with id=" + id,
      });
    });
};
