const path = require("path");

module.exports = {
  entry: "./src/controllers/controller.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
