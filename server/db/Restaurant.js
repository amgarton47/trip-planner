const Sequelize = require("sequelize");
const db = require("./_db");

const Restaurant = db.define("restaurant", {
  name: Sequelize.STRING,
  cuisine: Sequelize.STRING,
  price: {
    type: Sequelize.INTEGER,
    validations: {
      min: 1,
      max: 5,
    },
  },
});

module.exports = Restaurant;
