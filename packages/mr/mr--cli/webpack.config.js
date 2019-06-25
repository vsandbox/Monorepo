const path = require("path");

module.exports = {
  entry: {
    "index": "./src/index.ts"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    library: "vladnets__mab-localizer",
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
