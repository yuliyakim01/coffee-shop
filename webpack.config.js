const path = require("path");

module.exports = {
  entry: "./src/index.js", // Your main entry file
  output: {
    filename: "main.js", // Output bundle name
    path: path.resolve(__dirname, "dist"), // Output directory
  },
  mode: "development", // Or 'production' for optimized build
};
