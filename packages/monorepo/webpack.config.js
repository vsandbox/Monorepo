const { makeConfig } = require("../webpack");

module.exports = makeConfig({
    workingDir: __dirname,
}, {
    output: {
        library: "vladnets_monorepo",
    },
});
