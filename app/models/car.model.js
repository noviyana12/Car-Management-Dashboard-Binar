const Sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Car = sequelize.define("car", {
    nama: {
      type: Sequelize.STRING,
    },
    sewaharian: {
      type: Sequelize.INTEGER,
    },
    ukuran: {
      type: Sequelize.ENUM("small", "medium", "large"),
    },

    foto: {
      type: Sequelize.BLOB("long"),
    },
  });

  return Car;
};
