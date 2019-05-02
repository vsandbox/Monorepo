import * as fs from "fs";
import * as path from "path";
import * as childProcess from "child_process";

interface IPackageConfig {
    name: string;
    version: string;
}

interface IArtifactData {
    name: string;
    version: string;
    sourceDir: string;
    targetDir: string;
}

const packTarball = (artifactData: IArtifactData) => {
    const packProcess = childProcess.exec("npm pack", {
        cwd: artifactData.sourceDir,
    });

    // packProcess.stdout.on("data", data => {
    //     console.log("\n-----------------Progress------------------------\n");
    //     console.log(data.toString());
    // });

    packProcess.stderr.on("data", data => {
        // console.log("\n-----------------Error Data------------------------\n");
        console.log(data.toString());
    });

    packProcess.on("close", (code) => {
        console.log("\n-----------------Close------------------------\n");
        console.log(code);
    });

    packProcess.on("error", (err) => {
        console.log("\n-----------------Error------------------------\n");
        console.log(err);
    });
};

const buildArtifact = (sourceDir: string, targetDir: string) => {

    // # Read a package.json

    const packageConfigPath = path.join(sourceDir, "package.json");

    let packageConfig: IPackageConfig;
    try {
        packageConfig = __non_webpack_require__(packageConfigPath);
    } catch (err) {
        console.error(`Error occurred while reading package.json from ${packageConfigPath}`);
        console.error(err);
        return;
    }

    const artifactData: IArtifactData = {
        name: packageConfig.name,
        version: packageConfig.version,
        sourceDir,
        targetDir,
    };

    console.log(artifactData);

    // # run `npm pack` from package dir

    packTarball(artifactData);

    // # copy result tarball to artifacts/name/version


};

buildArtifact(path.resolve("../artifact-test"), path.resolve("../../../../artifacts"));
