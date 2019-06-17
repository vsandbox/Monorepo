// import HTMLWebpackPlugin from "html-webpack-plugin";
const { makeConfig } = require("../webpack");

module.exports = makeConfig({
    workingDir: __dirname,
}, {
    entry: {
        index: "./src/index.ts"
    },
    output: {
        library: "vladnets_monorepo",
    },
});
