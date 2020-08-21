const Sequelize = require("sequelize");
const db = require("./_db");

const Place = db.define("place", {
  addres: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  phone: Sequelize.STRING,
  location: Sequelize.ARRAY(Sequelize.FLOAT),
});

module.exports = Place;
