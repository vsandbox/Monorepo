const { makeConfig } = require("../webpack");

module.exports = makeConfig({
    workingDir: __dirname,
}, {
    entry: {
        index: "./src/index.ts",
        // test: "./test/index.ts",
    },
    output: {
        library: "vladnets_monorepo",
    },
});
