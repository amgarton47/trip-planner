const Sequelize = require("sequelize");
const databaseUrl =
  process.env.DATABASE_URL || "postgres://localhost:6543/tripplanner";
const db = new Sequelize(databaseUrl, {
  logging: false,
});

module.exports = db;
