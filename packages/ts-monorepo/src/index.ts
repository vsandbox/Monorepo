// Read up first monorepo.json
// Read all package.json according to monorepo.json
// Build a package map - `name:path`
// Link cross-dependencies according to packages' package.json

import path from "path";
import glob from "glob";
import npm from "npm";

console.log("\n------------------------------\n");

export interface IHash<T> {
  [key: string]: T;
}

export interface IPackageConfig {
  name: string;
  relativePath: string;
  dependencyPackageNameArray: string[];
}

export interface IMonorepoState {
  cwd: string;
  includePackagesGlob: string;
  excludePackagesGlob: string;
  mainPackageConfig: IPackageConfig;
  packageConfigHash: IHash<IPackageConfig>;
  packageLinkHash: IHash<IPackageConfig[]>;
  dependencyPackageNameArray: string[];
}

const parseRawPackageConfig = (rawPackageConfig: any, relativePath: string): IPackageConfig => {
  const dependencyHash = rawPackageConfig.dependencies || {};
  const devDependencyHash = rawPackageConfig.devDependencies || {};
  const commonDependencyHash = {...dependencyHash, ...devDependencyHash};
  const dependencyPackageNameArray: string[] = Object.keys(commonDependencyHash);

  return {
    name: rawPackageConfig.name,
    relativePath,
    dependencyPackageNameArray,
  };
};

export const readPackageConfigs = (state: IMonorepoState): Promise<IMonorepoState> => {
  return new Promise((resolve, reject) => {
    const mainPackageConfigName = "package.json";
    const mainPackageConfigPath = path.join(state.cwd, mainPackageConfigName);
    let mainPackageConfig: IPackageConfig;

    let newState: IMonorepoState = {
      ...state,
    };

    try {
      const rawMainPackageConfig = __non_webpack_require__(mainPackageConfigPath);
      mainPackageConfig = parseRawPackageConfig(rawMainPackageConfig, mainPackageConfigName);
    } catch (err) {
      reject(err);
      return;
    }

    // read files by provided glob pattern (read package.json files as usually)
    glob(state.includePackagesGlob, {
      cwd: state.cwd,
      ignore: state.excludePackagesGlob,
    }, (err, fileNames) => {
      if (err) {
        reject(err);
        return;
      }

      // fill the array with promises from config readers
      const packageConfigPromiseArray: Promise<IPackageConfig>[] = fileNames.map(relativePath => {
        return new Promise((resolvePackageConfigPromise, rejectPackageConfigPromise) => {
          const packageConfigPath = path.join(state.cwd, relativePath);

          try {
            const rawPackageConfig = __non_webpack_require__(packageConfigPath);
            const packageConfig: IPackageConfig = parseRawPackageConfig(rawPackageConfig, relativePath);

            resolvePackageConfigPromise(packageConfig);
          }
          catch (err) {
            rejectPackageConfigPromise(err);
          }
        });
      });

      // Wait until all package configs are read
      Promise.all(packageConfigPromiseArray)
        .then(packageConfigArray => {
          const packageConfigHash = packageConfigArray.reduce<IHash<IPackageConfig>>((acc, packageConfig) => {
            acc[packageConfig.name] = packageConfig;
            return acc;
          }, {});

          const dependencyPackageNameArray = packageConfigArray.reduce<string[]>((acc, packageConfig) => {
            acc = packageConfig.dependencyPackageNameArray.reduce<string[]>((nameArray, name) => {
              if (!(name in packageConfigHash) && !nameArray.includes(name)) {
                nameArray = [...nameArray, name];
              }
              return nameArray;
            }, acc);

            return acc;
          }, []);

          newState = {
            ...newState,
            mainPackageConfig,
            packageConfigHash,
            dependencyPackageNameArray,
          };

          resolve(newState);
        })
        .catch(err => {
          reject(err);
        });
    });
  });
};

export const updatePackageLinks = (state: IMonorepoState): IMonorepoState => {
  const packageLinkHash = Object
    .values(state.packageConfigHash)
    .reduce<IHash<IPackageConfig[]>>((packageLinkHashAcc, packageConfig) => {
      const packageLinks = packageConfig.dependencyPackageNameArray
        .reduce<IPackageConfig[]>((packageLinksAcc, dependencyPackageName) => {
          const packageConfig = state.packageConfigHash[dependencyPackageName];
          if (packageConfig) {
            packageLinksAcc = [...packageLinksAcc, packageConfig];
          }
          return packageLinksAcc;
        }, []);

      if (packageLinks.length > 0) {
        packageLinkHashAcc = {
          ...packageLinkHashAcc,
          [packageConfig.name]: packageLinks,
        };
      }

      return packageLinkHashAcc;
    }, {});

  const newState: IMonorepoState = {
    ...state,
    packageLinkHash
  };
  return newState;
};

export const linkPackages = (state: IMonorepoState): Promise<IMonorepoState> => {
  return new Promise((resolve, reject) => {
    const { packageLinkHash } = state;

    // Object.entries(packageLinkHash).map(() => {

    // });
  });
};

const cwd = path.join(process.cwd(), "../test");
const testState: IMonorepoState = {
  cwd,
  includePackagesGlob: "*/**/package.json",
  excludePackagesGlob: "**/node_modules/**",
  mainPackageConfig: null,
  packageConfigHash: {},
  packageLinkHash: {},
  dependencyPackageNameArray: [],
};

readPackageConfigs(testState).then((newTestState) => {
  newTestState = updatePackageLinks(newTestState);
  console.log(newTestState);
});

