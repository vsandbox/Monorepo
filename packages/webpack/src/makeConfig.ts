import * as path from "path";
import { Configuration } from "webpack";

export interface IMakeConfigEnv {
    workingDir: string;
}

export const makeConfig = (env: IMakeConfigEnv, userConfig: Configuration): Configuration => {
    const defaultEntryPointPath = path.join(env.workingDir, "src/index.ts");
    const defaultOutDirPath = path.join(env.workingDir, "dist");

    let resultConfig: Configuration = {
        ...userConfig,

        entry: userConfig.entry || { index: defaultEntryPointPath },
        target: userConfig.target || "node",
        mode: userConfig.mode || "development",
        devtool: userConfig.devtool || "inline-source-map",

        output: {
            filename: "[name].js",
            path: defaultOutDirPath,
            library: "vladnets__webpack",
            libraryTarget: "umd",

            ...userConfig.output,
        },

        module: {
            rules: [
              {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
              }
            ],

            ...userConfig.module,
        },

        resolve: {
            extensions: [ ".ts", ".js" ],

            ...userConfig.resolve,
        }
    };

    return resultConfig;
};

export const makeConfigArray = (configArray: [IMakeConfigEnv, Configuration][]) => {
    console.log("\n\n----------- configArray\n\n--------", configArray);
    return configArray.map(([env, config]) => {
        return makeConfig(env, config);
    });
};
