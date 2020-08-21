const Sequelize = require("sequelize");
const db = require("./_db");

const Hotel = db.define("hotel", {
  name: Sequelize.STRING,
  num_stars: {
    type: Sequelize.FLOAT,
    validations: {
      min: 1,
      max: 5,
    },
  },
  amenitites: Sequelize.STRING,
});

module.exports = Hotel;
