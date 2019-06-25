import path from "path";
import glob from "glob";
import symlinkDir  from "symlink-dir";
import { findFileNameUp } from "./helpers";

export const link = async () => {
  findFileNameUp(process.cwd(), "dev.json")
  .then(configFilePath => {
    const rootDirAbsPath = path.dirname(configFilePath);
    const nodeModulesDirAbsPath = path.join(rootDirAbsPath, "node_modules");

    glob("*/**/package.json", {
      ignore: "**/node_modules/**",
      cwd: rootDirAbsPath,
    }, (err, fileRelPathArray) => {

      const promises = fileRelPathArray.map((fileRelPath) => {
        const fileAbsPath = path.join(rootDirAbsPath, fileRelPath);

        const packageConfig = __non_webpack_require__(fileAbsPath);

        const fileDirAbsPath = path.dirname(fileAbsPath);
        const targetDirAbsPath = path.join(nodeModulesDirAbsPath, packageConfig.name);

        return symlinkDir(fileDirAbsPath, targetDirAbsPath);
      });

      Promise.all(promises)
        .then(() => {
          console.log(`[OK] Linked: ${fileRelPathArray.join(" | ")}`);
        })
        .catch(err => {
          console.log("[ERROR]");
          console.log(err);
        });
    });

  })
  .catch(err => {
    console.log("[ERROR]");
    console.log(err);
  });
};
