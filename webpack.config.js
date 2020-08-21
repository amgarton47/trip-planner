const path = require("path");

module.exports = {
  // the starting point for our program
  entry: "./client/index.js",

  // affects several default webpack settings
  mode: "development",

  output: {
    // The absolute path for the directory where we want the output to be placed.
    // Whenever we need an absolute path, it's a best practice to use the built-in
    // `path` module
    path: path.join(__dirname, "/public"),

    // The name of the file that will contain our output.
    // We could name this whatever we want, but bundle.js is typical
    filename: "bundle.js",
  },

  // Creates "source map" files (ex. "bundle.js.map"). Modern browsers can automatically
  // request these to "rebuild" your original source code in your dev tools (i.e. the Sources tab).
  // This makes debugging much, much nicer
  devtool: "source-map",
};
