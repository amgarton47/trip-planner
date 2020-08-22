const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");

const { db } = require("./db");

const apiRoute = require("./routes/api");

// logging middleware
const morgan = require("morgan");
app.use(morgan("dev"));

// serves up static files
app.use(express.static(path.join(__dirname, "..", "public")));

// body and json parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  res.send("Root page!");
});

app.use("/api", apiRoute);

// 404 error handler
app.use((req, res, next) => {
  res.status(404);
  res.send("404 - page not found");
});

// 500 error handler
app.use((err, req, res, next) => {
  res.status(500);
  res.send("A 500 error occured" + err);
  console.log(err);
});

const startApp = async () => {
  try {
    await db.sync(/*{ force: true }*/);
  } catch (err) {
    console.log("There was an issue syncing with the databse" + err);
  }

  app.listen(PORT, () => {
    console.log(`trip planner is up and running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
  });
};

startApp();
