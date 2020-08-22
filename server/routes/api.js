const express = require("express");
const apiRouter = express.Router();

const { Hotel, Restaurant, Activity, Place } = require("../db");

apiRouter.get("/", async (req, res, next) => {
  const [hotels, restaurants, activities] = await Promise.all([
    Hotel.findAll({ include: [Place] }),
    Restaurant.findAll({ include: [Place] }),
    Activity.findAll({ include: [Place] }),
  ]);

  res.json({ hotels, restaurants, activities });
});

module.exports = apiRouter;
