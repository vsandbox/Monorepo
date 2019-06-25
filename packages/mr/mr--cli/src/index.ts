import fs from "fs";
import path from "path";
import glob from "glob";
import webpack from "webpack";
import { findFileNameUp } from "./helpers";

console.log("\n\n--------------------------------\nwebpack-man\n--------------------------------\n");

// const actionName = process.argv[2];
const actionName: string = "link";
const configurationName = process.argv[3];

const runWebpack = () => {
  const configurationName = "default";

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
        const packageDirAbsPathArray = fileRelPathArray.reduce((absPathArray, fileRelPath) => {
          const fileAbsPath = path.join(rootDirAbsPath, fileRelPath);
          const packageConfig = __non_webpack_require__(fileAbsPath);

          if (!foundPackagesMap[packageConfig.name] && config[packageConfig.name]) {
            const packageDirAbsPath = path.dirname(fileAbsPath);
            foundPackagesMap[packageConfig.name] = true;
            return [...absPathArray, packageDirAbsPath];
          }

          return absPathArray;
        }, []);

        console.log(packageDirAbsPathArray);
      });

    })
    .catch(err => {
      console.log("[ERROR]");
      console.log(err);
    });
};

const link = () => {
  findFileNameUp(process.cwd(), "dev.json")
  .then(configFilePath => {
    const rootDirAbsPath = path.dirname(configFilePath);
    const nodeModulesDirAbsPath = path.join(rootDirAbsPath, "node_modules");

    glob("*/**/package.json", {
      ignore: "**/node_modules/**",
      cwd: rootDirAbsPath,
    }, (err, fileRelPathArray) => {

      fileRelPathArray.forEach((fileRelPath) => {
        const fileAbsPath = path.join(rootDirAbsPath, fileRelPath);

        const packageConfig = __non_webpack_require__(fileAbsPath);
        // const name: string = packageConfig.name;

        // if (name.charAt(0) === "@") {

        // }

        const fileDirAbsPath = path.dirname(fileAbsPath);
        const targetDirAbsPath = path.join(nodeModulesDirAbsPath, packageConfig.name);
        // console.log("DIR:", fileDirAbsPath, targetDirAbsPath);
        fs.symlinkSync("./test", "./bin");
      });

      console.log(`Done: ${fileRelPathArray.join(" | ")}`);
    });

  })
  .catch(err => {
    console.log("[ERROR]");
    console.log(err);
  });
};

switch (actionName) {
  case "webpack":
    runWebpack();
    break;

  case "link":
    link();
    break;

  default:
    console.log(`Action ${actionName} is not found`);
    break;
}

