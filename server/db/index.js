const Hotel = require("./Hotel");
const Restaurant = require("./Restaurant");
const Activity = require("./Activity");
const Place = require("./Place");
const db = require("./_db");

Hotel.belongsTo(Place);
Restaurant.belongsTo(Place);
Activity.belongsTo(Place);

module.exports = { db, Hotel, Restaurant, Activity, Place };
