import fs from "fs";
import path from "path";

interface IActionContext {
  isCancelled: boolean;
};
const checkFileNameInDir = (ctx: IActionContext, cwdAbsPath: string, fileName: string) => {
  return new Promise<boolean>((resolve, reject) => {
    fs.access(cwdAbsPath, (err) => {
      if (err) {
        reject(err);
        return;
      }

      if (ctx.isCancelled) {
        return;
      }

      fs.stat(cwdAbsPath, (err, stats) => {
        if (err) {
          reject(err);
          return;
        }

        if (ctx.isCancelled) {
          return;
        }

        if (!stats.isDirectory()) {
          reject(new Error(`checkFileNameInDir: ${cwdAbsPath} isn't a directory`));
          return;
        }

        fs.readdir(cwdAbsPath, (err, fileNameArray: string[]) => {
          if (err) {
            reject(err);
            return;
          }

          if (ctx.isCancelled) {
            return;
          }

          const index = fileNameArray.indexOf(fileName);
          if (index > -1) {
            const filePath = path.join(cwdAbsPath, fileName);
            fs.access(filePath, (err) => {
              if (err) {
                reject(err);
                return;
              }

              resolve(true);
            });
          }
          else {
            resolve(false);
          }
        });
      });
    });
  });
};

const findFileNameUp = (ctx: IActionContext, cwdAbsPath: string, fileName: string) => {
  return new Promise<string | null>((resolve, reject) => {
    const checkFileNameInDirPromise = checkFileNameInDir(ctx, cwdAbsPath, fileName);
    checkFileNameInDirPromise
      .then((isFileExisted) => {
        if (isFileExisted) {
          const filePath = path.join(cwdAbsPath, fileName);
          resolve(filePath);
        }
        else {
          const parentAbsPath = path.join(cwdAbsPath, "../");

          if (parentAbsPath === cwdAbsPath) {
            resolve(null);
            return;
          }

          const nestedPromise = findFileNameUp(ctx, parentAbsPath, fileName);

          nestedPromise
            .then(resolve)
            .catch(reject);
        }
      })
      .catch(reject);
  });
};

findFileNameUp({ isCancelled: false }, process.cwd(), "mr.json")
  .then((fileName) => {
    console.log("FileName", fileName);
  })
  .catch(err => {
    console.log(err);
  });

