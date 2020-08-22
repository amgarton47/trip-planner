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

apiRouter.post("/add/hotel", async (req, res, next) => {
  try {
    Hotel.create(req.body);
  } catch (err) {
    next(err);
  }
  res.redirect("/");
});

apiRouter.post("/add/restaurant", async (req, res, next) => {
  try {
    Restaurant.create(req.body);
  } catch (err) {
    next(err);
  }
  res.redirect("/");
});

apiRouter.post("/add/activity", async (req, res, next) => {
  try {
    Activity.create(req.body);
  } catch (err) {
    next(err);
  }
  res.redirect("/");
});

module.exports = apiRouter;
