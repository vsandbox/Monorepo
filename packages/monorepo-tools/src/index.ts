import fs from "fs";
import path from "path";
import childProcess from "child_process";

const moveArtifact = (artifactName: string, artifactTargetPath: string, artifactDestPath: string) => {
    fs.copyFile(artifactTargetPath, artifactDestPath, (err) => {
        if (err) {
            console.error(err);
            return;
        }

        fs.unlink(artifactTargetPath, err => {
            if (err) {
                console.error(`Error occured while artifact was moved to "${artifactTargetPath}"`);
                console.error(err);
                return;
            }
            
            console.log(`Artifact "${artifactName}" was successfully built.`);
            console.log(`Artifact "${artifactName}" moved to ${artifactDestPath}`);
        });
    });
};

const publishArtifact = (packageDir: string, artifactRegistryDir: string) => {
    // const packageDir = path.join(process.cwd(), packageDir);
    const packageJsonPath = path.join(packageDir, "package.json");
    
    fs.exists(packageJsonPath, (exists: boolean) => {
        if (!exists) {
            console.error(`Can't load package config by ${packageJsonPath}`);
            return;
        }

        const packageConfig = __non_webpack_require__(packageJsonPath);

        childProcess.exec("npm pack", {
            cwd: packageDir
        }, (err, stdout, stderr) => {
            if (err) {
                console.error(`Error occured while packing package by path "${packageDir}"`);
                console.error(err);
                return;
            }
            let artifactPackageName: string = packageConfig.name;
            artifactPackageName = artifactPackageName.replace("@", "");
            artifactPackageName = artifactPackageName.replace("/", "-");
    
            const artifactTargetName = `${artifactPackageName}-${packageConfig.version}.tgz`;
            const artifactDestName = `${packageConfig.version}.tgz`;
            const artifactTargetPath = path.join(packageDir, artifactTargetName);
            
            const artifactDir = path.join(artifactRegistryDir, artifactPackageName);
            
            fs.exists(artifactDir, (exists) => {
                const artifactDestPath = path.join(artifactDir, artifactDestName);
                
                if (!exists) {
                    fs.mkdir(artifactDir, (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        moveArtifact(artifactTargetName, artifactTargetPath, artifactDestPath);
                    });
                }
                else {
                    moveArtifact(artifactTargetName, artifactTargetPath, artifactDestPath);
                }
            });


        });
    });
};

publishArtifact(
    path.join(process.cwd(), "packages/test"),
    path.join(process.cwd(), "artifacts"),
);

