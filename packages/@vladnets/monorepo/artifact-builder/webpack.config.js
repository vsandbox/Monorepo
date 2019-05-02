const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    library: "vladnets__monorepo-tools",
    libraryTarget: "umd",
  },

  target: "node",
  mode: "development",
  devtool: "inline-source-map",

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      }
    ],
  },

  resolve: {
    extensions: [ ".ts", ".js" ],
  }
};
