import fs from "fs";
import path from "path";
import glob from "glob";
import webpack from "webpack";
import { findFileNameUp } from "./helpers";

export const runWebpack = (configurationName: string) => {
  findFileNameUp(process.cwd(), "dev.json")
    .then(configFilePath => {
      const config = __non_webpack_require__(configFilePath).webpackConfigurations[configurationName];

      if (!config) {
        console.log(`[ERROR] Configuration ${configurationName} is not found`)
        return;
      }

      const rootDirAbsPath = path.dirname(configFilePath);

      console.log(rootDirAbsPath);

      glob("*/**/package.json", {
        ignore: "**/node_modules/**",
        cwd: rootDirAbsPath,
      }, (err, fileRelPathArray) => {

        console.log(fileRelPathArray);

        const foundPackagesMap: { [key: string]: boolean; } = {};
        const packageInfoArr = fileRelPathArray.reduce<{dirAbsPath: string; config: any}[]>((packageInfoArr, fileRelPath) => {
          const fileAbsPath = path.join(rootDirAbsPath, fileRelPath);
          const packageConfig = __non_webpack_require__(fileAbsPath);

          if (!foundPackagesMap[packageConfig.name] && config[packageConfig.name]) {
            const packageDirAbsPath = path.dirname(fileAbsPath);
            foundPackagesMap[packageConfig.name] = true;
            return [...packageInfoArr, {
              dirAbsPath: packageDirAbsPath,
              config: packageConfig,
            }];
          }

          return packageInfoArr;
        }, []);

        const webpackConfigArr = packageInfoArr.map(packageInfo => {
          const distAbsPath = path.join(packageInfo.dirAbsPath, "dist");
          const webpackInfo = {
            cwd: packageInfo.dirAbsPath,
            config: {
              entry: {
                "index": path.join(packageInfo.dirAbsPath, "src/index.ts"),
              },
              output: {
                filename: "[name].js",
                path: distAbsPath,
                library: `${packageInfo.config.name.replace(/[\@\/-]/g, "_")}`,
                libraryTarget: "umd",
              },

              target: "node",
              mode: "development",
              devtool: "inline-source-map",

              module: {
                rules: [
                  {
                    test: /\.ts$/,
                    use: [{
                      loader: "ts-loader",
                      options: {
                        compilerOptions: {
                          outDir: distAbsPath,
                        },
                      },
                    }],
                    exclude: /node_modules/,
                  }
                ],
              },

              resolve: {
                extensions: [ ".ts", ".js" ],
              },
            }
          };

          return webpackInfo.config;
        });

        const configsJSON = JSON.stringify(webpackConfigArr, null, 2);
        const webpackConfigContent = `module.exports = ${configsJSON}`;

        // console.log(webpackConfigContent);

        const webpackConfigFileAbsPath = path.join(rootDirAbsPath, "webpack.config.js");
        fs.writeFileSync(webpackConfigFileAbsPath, webpackConfigContent);

        console.log(`[OK] Created ${webpackConfigFileAbsPath}`);

        // console.log(JSON.stringify(webpackConfigArr, null, 2));
        // const compiler = webpack(webpackConfigArr as any);
        // compiler.watch({}, (err, stats) => {
        //   if (err) {
        //     console.log("[ERROR]");
        //     console.log(err);
        //   }
        //   else {
        //     console.log((stats as any)[0]);
        //   }
        // });
      });

    })
    .catch(err => {
      console.log("[ERROR]");
      console.log(err);
    });
};
