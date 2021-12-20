const path = require("path");

module.exports = {
  entry: "./board/ts/Main.ts",
  devtool: "inline-source-map",
  mode: "production",
  watch: true,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "script.js",
    path: path.resolve(__dirname, "./board"),
  },
};
