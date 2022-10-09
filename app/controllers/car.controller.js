const fs = require("fs");

const db = require("../models");
const Car = db.cars;
const Op = db.Sequelize.Op;

const multer = require("multer");

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

const maxSize = 1 * 2028 * 2048;

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
  limits: { fileSize: maxSize },
});

exports.fileSizeLimitErrorHandler = (err, req, res, next) => {
  if (err) {
    req.flash("messageErr", "File gambar terlalu besar");
    return res.redirect("/add");
  } else {
    next();
  }
};
/* HANDLING IMAGE */

/*HANDLING TAMBAH DATA */
exports.add = (req, res) => {
  res.render("addCar", {
    messageErr: req.flash("messageErr"),
  });
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

  Car.create(car)
    .then((data) => {
      req.flash("message", "Data Berhasil Disimpan");

      /* untuk testing di postman 
          return res.send(data);
      */
      return res.redirect("/");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating cars",
      });
    });
};
/*END HANDLING TAMBAH DATA */

/*HANDLING FIND ALL CAR */
exports.findAll = (req, res) => {
  const nama = req.query.nama;
  var condition = nama ? { nama: { [Op.like]: `%${nama}%` } } : null;

  Car.findAll({ where: condition })
    .then((data) => {
      //
      /* untuk testing di postman 
          return res.send(data);
      */

      res.render("listCar", {
        data: data,
        message: req.flash("message"),
        messageDel: req.flash("messageDel"),
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving cars.",
      });
    });
};
/*END HANDLING FIND ALL CAR */

/*HANDLING EDIT CAR - GO TO EDIT PAGE */
exports.edit = (req, res) => {
  const id = req.params.id;

  Car.findByPk(id)
    .then((data) => {
      if (data) {
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
/*END HANDLING EDIT CAR - GO TO EDIT PAGE */

/*HANDLING UPDATE CAR */
exports.update = (req, res) => {
  const id = req.params.id;

  const car = {
    nama: req.body.nama,
    sewaharian: req.body.sewaharian,
    ukuran: req.body.ukuran,
  };
  if (req.file) {
    car.foto = req.file.filename;
  }

  Car.update(car, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        /* untuk testing di postman 
          return res.send(car);
        */
        return res.redirect("/");
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
/*END HANDLING UPDATE CAR */

/*HANDLING DELETE CAR */
exports.delete = (req, res) => {
  const id = req.params.id;

  Car.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        req.flash("messageDel", "Data Berhasil Dihapus");

        /* untuk testing di postman 
          return res.send("Data berhasil dihapus");
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
/*END HANDLING DELETE CAR */
